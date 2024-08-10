'use client';

import { Flex } from '@/shared/components/layout';
import * as s from './AdminStyle.css';
import * as cs from '@/shared/styles/common.css';
import { vars } from '@/shared/styles/theme.css';
import Spacing from '@/shared/components/layout/Spacing';
import { Input } from '@/shared/components/input';
import { DropImageBox } from '../../../public/svgs';
import Image from 'next/image';
import { useDropzone, Accept } from 'react-dropzone';
import { useState, useCallback } from 'react';
import { Button } from '@/shared/components/button';
import AdminProductInput from './AdminProductInput';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { ProductInfoFormData, productInfoSchema } from '@/utils/validation/product';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postProduct } from '@/app/api/product/postProduct';
import useAlertContext from '@/hooks/useAlertContext';
import AlertMainTextBox from '@/shared/components/alert/AlertMainTextBox';
import ProductError from '@/utils/error/ProductError';
import AdminProductSelect from './AdminProductSelect';
import AdminProductTextArea from './AdminProductTextArea';

interface FileWithPreview extends File {
	preview: string;
}

const AddProductBox = () => {
	const [files, setFiles] = useState<FileWithPreview[]>([]);
	const [isImageAdded, setIsImageAdded] = useState(false);

	const { open, close } = useAlertContext();

	const queryClient = useQueryClient();

	const onDrop = useCallback((acceptedFiles: File[]) => {
		setFiles(
			acceptedFiles.map((file) =>
				Object.assign(file, {
					preview: URL.createObjectURL(file),
				}),
			),
		);
		setIsImageAdded(true);
	}, []);

	const { getRootProps, getInputProps } = useDropzone({
		accept: { 'image/*': [] } as Accept,
		onDrop,
	});

	const thumbs = files.map((file) => (
		<div
			key={file.name}
			style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
			<Image
				src={file.preview}
				alt={file.name}
				width={100}
				height={100}
				style={{ objectFit: 'cover' }}
				onLoad={() => {
					URL.revokeObjectURL(file.preview);
				}}
			/>
		</div>
	));

	const methods = useForm<ProductInfoFormData>({
		resolver: zodResolver(productInfoSchema),
		mode: 'onChange',
		defaultValues: {
			name: '',
			homePage: '',
			csCenter: '',
			description: '',
			publisher: '',
			category: '',
		},
	});

	const { handleSubmit, reset } = methods;

	const postProductMutation = useMutation({
		mutationFn: (data: ProductInfoFormData) => postProduct(data),
		onSuccess: () => {
			open({
				width: '300px',
				height: '200px',
				title: '상품권 생성 완료',
				main: <AlertMainTextBox text="상품권이 생성되었습니다." />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: close,
			});
			queryClient.invalidateQueries({ queryKey: ['productList'] });
			reset({
				name: '',
				homePage: '',
				csCenter: '',
				description: '',
				publisher: '',
				category: '',
			});
		},
		onError: (error: ProductError) => {
			open({
				width: '300px',
				height: '200px',
				title: '상품권 생성 실패',
				main: <AlertMainTextBox text={error.errorMessage} />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: close,
			});
		},
	});

	const onSubmit: SubmitHandler<ProductInfoFormData> = (data, event) => {
		event?.preventDefault();
		postProductMutation.mutate(data);
	};

	return (
		<FormProvider {...methods}>
			<form
				id="admin-product-form"
				style={{
					width: '65%',
					height: '500px',
					padding: '18px 2.5%',
					backgroundColor: vars.color.white,
					border: `1px solid ${vars.color.lighterGray}`,
				}}
				onSubmit={handleSubmit(onSubmit)}>
				<div className={s.blackMediumText}>상품권 추가</div>
				<Spacing margin="23px" />
				<Flex>
					<div style={{ flex: 1, marginRight: '10px' }}>
						<AdminProductInput name="name" label="상품권명" flex="3" />
						<Spacing margin="25px" />
						<AdminProductInput
							name="logoImages"
							label="로고"
							type="file"
							flex="3"
							style={{ borderBottom: 'none' }}>
							<div
								{...getRootProps({ className: s.dropzone })}
								style={{ position: 'relative', flex: '3', height: '100px', marginLeft: '1.5%' }}>
								<input {...getInputProps()} />
								{!isImageAdded && (
									<Image src={DropImageBox} alt="이미지 등록 하기" className={s.dropImageBox} />
								)}
								{thumbs}
							</div>
						</AdminProductInput>
						<Spacing margin="25px" />
						<AdminProductInput name="homePage" label="홈페이지" flex="3" />
						<Spacing margin="25px" />
						<AdminProductInput name="csCenter" label="고객센터" flex="3" />
						<Spacing margin="25px" />
						<AdminProductTextArea name="description" label="상세설명" />
						<Spacing margin="25px" />
					</div>
					<div style={{ flex: 1 }}>
						<AdminProductInput name="publisher" label="발행업체" flex="3" />
						<Spacing margin="25px" />
						<AdminProductSelect label="카테고리" name="category" />
						<Spacing margin="25px" />
						<Flex align="center">
							<div className={s.darkGraySmallText} style={{ flex: '1', minWidth: '50px' }}>
								판매금액
							</div>
							<Flex
								style={{
									flex: '3',
									marginLeft: '1.5%',
									alignItems: 'center',
									overflow: 'hidden',
								}}>
								<div style={{ marginRight: '4px' }}>
									<AdminProductInput
										name="priceName"
										flex="1"
										placeholder="금액명"
										className={s.rateInputStyle}
										style={{ textAlign: 'left', width: '100%' }}
									/>
								</div>
								<AdminProductInput name="price" flex="1.5">
									<Input
										type="number"
										step="1000"
										placeholder="상품금액(원)"
										className={s.rateInputStyle}
										style={{ textAlign: 'left', width: '100%' }}
									/>
								</AdminProductInput>
								<Button
									color={vars.color.black}
									style={{
										minWidth: '40px',
										padding: '4px',
										backgroundColor: vars.color.white,
										border: `1px solid ${vars.color.lightestGray}`,
									}}>
									추가
								</Button>
							</Flex>
						</Flex>
						<Spacing margin="25px" />
						<Flex justify="flex-end" align="flex-end" style={{ width: '100%', height: '56%' }}>
							<Button
								id="admin-product-form"
								color={vars.color.black}
								className={s.lightGrayButton}
								style={{
									minWidth: '100px',
									padding: '4px',
								}}
								type="submit">
								추가
							</Button>
						</Flex>
					</div>
				</Flex>
			</form>
		</FormProvider>
	);
};

export default AddProductBox;
