'use client';

import { fetchDeletePriceCategory } from '@/app/api/product/fetchDeletePriceCategory';
import { fetchPriceCategoryList } from '@/app/api/product/fetchPriceCategoryList';
import { fetchProductInfo } from '@/app/api/product/fetchProductInfo';
import { fetchUpdateProduct } from '@/app/api/product/fetchUpdateProduct';
import useAlertContext from '@/hooks/useAlertContext';
import { useProductWithPriceCategoryMutation } from '@/hooks/useProductWithPriceCategoryMutation';
import { PriceCategoryInfo } from '@/models/product';
import AlertMainTextBox from '@/shared/components/alert/AlertMainTextBox';
import { Button } from '@/shared/components/button';
import { Flex } from '@/shared/components/layout';
import Spacing from '@/shared/components/layout/Spacing';
import * as cs from '@/shared/styles/common.css';
import { vars } from '@/shared/styles/theme.css';
import {
	PriceCategoryInfoFormData,
	ProductInfoFormData,
	productInfoSchema,
} from '@/utils/validation/product';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { Accept, useDropzone } from 'react-dropzone';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { IoIosRemoveCircle } from 'react-icons/io';
import { DropImageBox } from '../../../out/svgs';
import AdminProductInput from './AdminProductInput';
import AdminProductSelect from './AdminProductSelect';
import AdminProductTextArea from './AdminProductTextArea';
import * as s from './AdminStyle.css';
import PriceCategoryInputGroup from './PriceCategoryInputGroup';

interface FileWithPreview extends File {
	preview: string;
}

interface Props {
	productId?: number;
	setSelectedProductId?: Dispatch<SetStateAction<number | undefined>>;
	setIsEditing: Dispatch<SetStateAction<boolean>>;
	isEditing: boolean;
}

const AddProductBox = ({ productId, setSelectedProductId, setIsEditing, isEditing }: Props) => {
	const [files, setFiles] = useState<FileWithPreview[]>([]);
	const [isImageAdded, setIsImageAdded] = useState(false);
	const [priceCategories, setPriceCategories] = useState<PriceCategoryInfo[]>([]);

	const { open, close } = useAlertContext();

	const queryClient = useQueryClient();

	const { data: productDetails, isSuccess } = useQuery({
		queryKey: ['productDetails', productId],
		queryFn: () =>
			productId ? fetchProductInfo(productId) : Promise.reject('No product ID provided'),
		enabled: !!productId,
	});

	const { data: priceCategoryList } = useQuery({
		queryKey: ['priceCategoryList', productId],
		queryFn: () =>
			productId ? fetchPriceCategoryList(productId) : Promise.reject('No product ID provided'),
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

	const { handleSubmit, setValue, reset } = methods;

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
		mutationFn: (categoryId: number) =>
			productId ? fetchDeletePriceCategory(productId, categoryId) : Promise.reject('No product ID'),
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

	const updateProductMutation = useMutation({
		mutationFn: (data: ProductInfoFormData) =>
			productId ? fetchUpdateProduct(productId, data) : Promise.reject('No product ID'),
		onSuccess: () => {
			open({
				width: '300px',
				height: '200px',
				title: '상품 업데이트 성공',
				main: <AlertMainTextBox text="상품 업데이트가 완료되었습니다." />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: close,
			});
			queryClient.invalidateQueries({
				queryKey: ['productDetails', productId],
			});
		},
		onError: () => {
			open({
				width: '300px',
				height: '200px',
				title: '상품 업데이트 실패',
				main: <AlertMainTextBox text="상품 업데이트가 실패되었습니다." />,
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

		if (productId) {
			updateProductMutation.mutate(
				{ ...data, priceCategories },
				{
					onSuccess: () => {
						reset({
							name: '',
							homePage: '',
							csCenter: '',
							description: '',
							publisher: '',
							category: '',
						});
						setPriceCategories([]);
						setIsEditing?.(false);
						setSelectedProductId?.(undefined);
					},
				},
			);
		} else {
			createProductWithCategory(
				{ ...data, priceCategories },
				{
					onSuccess: () => {
						reset();
						setPriceCategories([]);
					},
				},
			);
		}
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
				<div className={s.blackMediumText}>상품권 {productId ? '수정' : '추가'}</div>
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
									<Image
										src={DropImageBox}
										alt="이미지 등록 하기"
										className={s.dropImageBox}
										width={50}
										height={50}
									/>
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
								{isEditing ? '수정' : '추가'}
							</Button>
						</Flex>
					</div>
				</Flex>
			</form>
		</FormProvider>
	);
};

export default AddProductBox;
