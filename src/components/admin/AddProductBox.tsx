'use client';

import { MouseEvent, useCallback, useEffect, useState } from 'react';
import { Flex } from '@/shared/components/layout';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import {
	ProductInfoFormData,
	PriceCategoryInfoFormData,
	productInfoSchema,
} from '@/utils/validation/product';
import { zodResolver } from '@hookform/resolvers/zod';
import * as s from './AdminStyle.css';
import * as cs from '@/shared/styles/common.css';
import { vars } from '@/shared/styles/theme.css';
import AdminProductInput from './AdminProductInput';
import AdminProductSelect from './AdminProductSelect';
import AdminProductTextArea from './AdminProductTextArea';
import PriceCategoryInputGroup from './PriceCategoryInputGroup';
import { useProductWithPriceCategoryMutation } from '@/hooks/useProductWithPriceCategoryMutation';
import Spacing from '@/shared/components/layout/Spacing';
import { Button } from '@/shared/components/button';
import { IoIosRemoveCircle } from 'react-icons/io';
import { Accept, useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { DropImageBox } from '../../../out/svgs';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getPriceCategoryList } from '@/app/api/product/getPriceCategoryList';
import { getProduct } from '@/app/api/product/getProduct';
import { deletePriceCategory } from '@/app/api/product/deletePriceCategory';
import { PriceCategoryInfo } from '@/models/product';
import useAlertContext from '@/hooks/useAlertContext';
import AlertMainTextBox from '@/shared/components/alert/AlertMainTextBox';

interface FileWithPreview extends File {
	preview: string;
}

interface Props {
	productId?: number;
}

const AddProductBox = ({ productId }: Props) => {
	const [files, setFiles] = useState<FileWithPreview[]>([]);
	const [isImageAdded, setIsImageAdded] = useState(false);
	const [priceCategories, setPriceCategories] = useState<PriceCategoryInfo[]>([]);

	const queryClient = useQueryClient();

	const { open, close } = useAlertContext();

	const { data: productDetails, isSuccess } = useQuery({
		queryKey: ['productDetails', productId],
		queryFn: () => getProduct(productId!),
		enabled: !!productId,
	});

	const { data: priceCategoryList } = useQuery({
		queryKey: ['priceCategoryList', productId],
		queryFn: () => getPriceCategoryList(productId!),
		enabled: !!productId,
	});

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

	useEffect(() => {
		if (isSuccess && productDetails) {
			const product = productDetails.data;

			methods.reset({
				name: product.name,
				homePage: product.homePage,
				csCenter: product.csCenter,
				description: product.description,
				publisher: product.publisher,
				category: product.category,
			});
			setPriceCategories(product.priceCategories || []);
		}
	}, [isSuccess, productDetails, methods]);

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

	const { handleSubmit, setValue } = methods;

	const { mutate: createProductWithCategory } = useProductWithPriceCategoryMutation({
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['priceCategoryList', productId],
			});
			queryClient.invalidateQueries({
				queryKey: ['productList'],
			});
		},
	});

	const deletePriceCategoryMutation = useMutation({
		mutationFn: (categoryId: number) => deletePriceCategory(productId!, categoryId),
		onSuccess: () => {
			open({
				width: '300px',
				height: '200px',
				title: '가격 카테고리 삭제 성공',
				main: <AlertMainTextBox text="가격 카테고리 삭제가 완료되었습니다." />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: close,
			});
			queryClient.invalidateQueries({
				queryKey: ['priceCategoryList', productId],
			});
		},
		onError: () => {
			open({
				width: '300px',
				height: '200px',
				title: '가격 카테고리 삭제 실패',
				main: <AlertMainTextBox text="가격 카테고리 삭제가 실패되었습니다." />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: close,
			});
		},
	});

	const handleAddCategory = (priceCategory: PriceCategoryInfoFormData) => {
		const newCategory: PriceCategoryInfo = {
			...priceCategory,
			id: Date.now(),
			createdAt: Date.now().toString(),
			stock: 1,
		};

		setPriceCategories((prevCategories) => [...prevCategories, newCategory]);
		setValue('priceCategories', [...priceCategories, priceCategory]);
	};

	const onSubmit: SubmitHandler<ProductInfoFormData> = (data, event) => {
		event?.preventDefault();
		createProductWithCategory({ ...data, priceCategories });
	};

	const handleDeleteCategory = (index: number, categoryId: number) => {
		open({
			width: '300px',
			height: '200px',
			title: '가격 카테고리 삭제',
			main: <AlertMainTextBox text="가격 카테고리를 삭제하시겠습니까?" />,
			rightButtonLabel: '확인',
			leftButtonLabel: '취소',
			rightButtonStyle: cs.lightBlueButton,
			leftButtonStyle: cs.whiteAndBlackButton,
			onRightButtonClick: () => {
				deletePriceCategoryMutation.mutate(categoryId);

				setPriceCategories((prevCategories) => {
					const updatedCategories = prevCategories.filter((_, i) => i !== index);
					setValue('priceCategories', updatedCategories);
					return updatedCategories;
				});

				close();
			},
			onLeftButtonClick: () => {
				close();
			},
		});
	};

	const displayedCategories = priceCategoryList?.data || priceCategories;

	return (
		<FormProvider {...methods}>
			<form
				id="admin-product-form"
				style={{
					position: 'relative',
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
						<PriceCategoryInputGroup productId={productId} onAddCategory={handleAddCategory} />
						<Spacing margin="25px" />
						{displayedCategories.length > 0 && (
							<div style={{ padding: '4px', marginLeft: '30px' }}>
								<Flex align="center" className={s.categoryListHeader}>
									<Flex
										justify="center"
										align="center"
										style={{ flex: 1, height: '20px', fontSize: '12px' }}>
										순번
									</Flex>
									<Flex
										justify="center"
										align="center"
										style={{ flex: 2, height: '20px', fontSize: '12px' }}>
										금액명
									</Flex>
									<Flex
										justify="center"
										align="center"
										style={{ flex: 2, height: '20px', fontSize: '12px' }}>
										금액(원)
									</Flex>
									<Flex
										justify="center"
										align="center"
										style={{ flex: 1, height: '20px', fontSize: '12px' }}>
										삭제
									</Flex>
								</Flex>
								{displayedCategories.map((category, index) => (
									<Flex align="center" key={index} className={s.categoryListItem}>
										<Flex justify="center" align="center" style={{ flex: 1, fontSize: '12px' }}>
											{index + 1}
										</Flex>
										<Flex justify="center" align="center" style={{ flex: 2, fontSize: '12px' }}>
											{category.name}
										</Flex>
										<Flex justify="center" align="center" style={{ flex: 2, fontSize: '12px' }}>
											{category.price.toLocaleString()}원
										</Flex>
										<Flex justify="center" align="center" style={{ flex: 1, fontSize: '12px' }}>
											<Flex justify="center" align="center">
												<Button
													style={{ backgroundColor: 'transparent', cursor: 'pointer' }}
													onClick={() => handleDeleteCategory(index, category.id)}>
													<IoIosRemoveCircle style={{ backgroundColor: 'transparent' }} />
												</Button>
											</Flex>
										</Flex>
									</Flex>
								))}
							</div>
						)}
						<Flex
							justify="flex-end"
							align="flex-end"
							style={{
								position: 'absolute',
								bottom: '10px',
								right: '30px',
								minWidth: '100px',
							}}>
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
