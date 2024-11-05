'use client';

import { deleteImageFromCloudinary } from '@/app/api/image/deleteImageFromCloudinary';
import { uploadImageToCloudinary } from '@/app/api/image/uploadImageToCloudinary';
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
	const [isUploading, setIsUploading] = useState(false);
	const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);

	const { open, close } = useAlertContext();

	const queryClient = useQueryClient();

	const { data: productDetails, isSuccess } = useQuery({
		queryKey: ['productDetails', productId],
		queryFn: () => fetchProductInfo(productId as number),
		enabled: !!productId,
	});

	const { data: priceCategoryList } = useQuery({
		queryKey: ['priceCategoryList', productId],
		queryFn: () => fetchPriceCategoryList(productId as number),
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
			note: '',
			publisher: '',
			category: '',
			logoImageUrl: '',
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
				note: product.note,
				publisher: product.publisher,
				category: product.category,
				logoImageUrl: product.logoImageUrl,
			});
			setCurrentImageUrl(product.logoImageUrl as string);
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
		handleImageUpload(acceptedFiles[0]);
	}, []);

	const handleImageUpload = async (file: File) => {
		setIsUploading(true);
		try {
			if (currentImageUrl) {
				const publicId = currentImageUrl.split('/').pop()?.split('.')[0];
				if (publicId) {
					await deleteImageFromCloudinary(publicId);
				}
			}

			const result = await uploadImageToCloudinary(file);
			const imageUrl = result.secure_url;
			methods.setValue('logoImageUrl', imageUrl);
			setCurrentImageUrl(imageUrl);
		} catch (error: unknown) {
			if (error instanceof Error) {
				open({
					width: '300px',
					height: '200px',
					title: '이미지 업로드 실패',
					main: <AlertMainTextBox text={error.message} />,
					rightButtonStyle: cs.lightBlueButton,
					onRightButtonClick: close,
				});
			}
		} finally {
			setIsUploading(false);
		}
	};

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
		mutationFn: (categoryId: number) => fetchDeletePriceCategory(productId as number, categoryId),
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
		mutationFn: (data: ProductInfoFormData) => fetchUpdateProduct(productId as number, data),
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
			queryClient.invalidateQueries({
				queryKey: ['productList'],
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

		if (isUploading) {
			return;
		}

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
							note: '',
							publisher: '',
							category: '',
							logoImageUrl: '',
						});
						setPriceCategories([]);
						setCurrentImageUrl(null);
						setFiles([]);
						setIsImageAdded(false);
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
						setCurrentImageUrl(null);
						setFiles([]);
						setIsImageAdded(false);
					},
				},
			);
		}
	};

	const handleDeleteCategory = (
		index: number,
		categoryId: number,
		event: React.MouseEvent<HTMLButtonElement>,
	) => {
		event.preventDefault();
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
								{!isImageAdded && currentImageUrl ? (
									<Image
										src={currentImageUrl}
										alt="현재 로고 이미지"
										width={100}
										height={100}
										style={{ objectFit: 'cover' }}
									/>
								) : (
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
						<AdminProductTextArea name="description" label="상세설명" />
						<Spacing margin="25px" />
						<AdminProductTextArea name="note" label="유의사항" />
						<Spacing margin="25px" />
					</div>
					<div style={{ flex: 1 }}>
						<AdminProductInput name="homePage" label="홈페이지" flex="3" />
						<Spacing margin="25px" />
						<AdminProductInput name="csCenter" label="고객센터" flex="3" />
						<Spacing margin="25px" />
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
													onClick={(e) => handleDeleteCategory(index, category.id, e)}>
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
