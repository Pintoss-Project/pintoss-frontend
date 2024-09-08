'use client';

import { deleteImageFromCloudinary } from '@/app/api/image/deleteImageFromCloudinary';
import { fetchDeleteProduct } from '@/app/api/product/fetchDeleteProduct';
import { fetchProductList } from '@/app/api/product/fetchProductList';
import {
	fetchUpdateProductStock,
	UpdateStockParams,
} from '@/app/api/product/fetchUpdateProductStock';
import useAlertContext from '@/hooks/useAlertContext';
import { ProductInfo, ProductInfoListResponse } from '@/models/product';
import AlertMainTextBox from '@/shared/components/alert/AlertMainTextBox';
import { Button } from '@/shared/components/button';
import { Input } from '@/shared/components/input';
import { Flex } from '@/shared/components/layout';
import * as cs from '@/shared/styles/common.css';
import { vars } from '@/shared/styles/theme.css';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, useEffect, useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import * as s from './AdminStyle.css';

interface Props {
	onSelectProduct: (productId: number) => void;
	onResetEdit: () => void;
}

const AdminProductList = ({ onSelectProduct, onResetEdit }: Props) => {
	const [selectedKind, setSelectedKind] = useState<{ [key: string]: string }>({});
	const [quantity, setQuantity] = useState<{ [key: string]: number }>({});
	const [isDeleting, setIsDeleting] = useState<boolean>(false);

	const { open, close } = useAlertContext();

	const queryClient = useQueryClient();

	const { data: products, isSuccess } = useQuery({
		queryKey: ['productList'],
		queryFn: () => fetchProductList(),
	});

	useEffect(() => {
		if (isSuccess && products) {
			const initialSelected: { [key: string]: string } = {};
			const initialQuantity: { [key: string]: number } = {};

			products.data.forEach((product: ProductInfo) => {
				const sortedCategories = product.priceCategories
					? [...product.priceCategories].sort((a, b) => a.price - b.price)
					: [];

				if (sortedCategories.length > 0) {
					initialSelected[product.id] = String(sortedCategories[0].id);
					initialQuantity[product.id] = sortedCategories[0].stock || 0;
				} else {
					initialSelected[product.id] = '';
					initialQuantity[product.id] = 0;
				}
			});

			setSelectedKind(initialSelected);
			setQuantity(initialQuantity);
		}
	}, [isSuccess, products]);

	const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>, product: ProductInfo) => {
		const kind = product.priceCategories?.find((k) => k.id === +event.target.value);
		if (kind) {
			setSelectedKind((prevState) => ({
				...prevState,
				[product.id]: String(kind.id),
			}));

			setQuantity((prevState) => ({
				...prevState,
				[product.id]: kind.stock,
			}));
		}
	};

	const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>, product: ProductInfo) => {
		const value = Math.max(0, Number(event.target.value));
		setQuantity((prevState) => ({
			...prevState,
			[product.id]: value,
		}));
	};

	const deleteProductMutation = useMutation({
		mutationFn: async (productId: number) => {
			setIsDeleting(true);
			const product = products?.data.find((p) => p.id === productId);
			if (product?.logoImageUrl) {
				const publicId = product.logoImageUrl.split('/').pop()?.split('.')[0];
				if (publicId) {
					await deleteImageFromCloudinary(publicId);
				}
			}
			return fetchDeleteProduct(productId);
		},
		onSuccess: (data, productId) => {
			queryClient.setQueryData(['productList'], (oldData: ProductInfoListResponse) => {
				return {
					...oldData,
					data: oldData.data.filter((product: ProductInfo) => product.id !== productId),
				};
			});
			open({
				width: '300px',
				height: '200px',
				title: '상품권 삭제 성공',
				main: <AlertMainTextBox text="상품권 삭제가 완료되었습니다." />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: close,
			});
			setIsDeleting(false);
			onResetEdit();
		},
		onError: () => {
			open({
				width: '300px',
				height: '200px',
				title: '상품권 삭제 실패',
				main: <AlertMainTextBox text="상품권 삭제가 실패되었습니다." />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: close,
			});
			setIsDeleting(false);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['productList'] });
		},
	});

	const handleDeleteProduct = (productId: number) => {
		open({
			width: '300px',
			height: '200px',
			title: '상품권 삭제',
			main: <AlertMainTextBox text="상품권를 삭제하시겠습니까?" />,
			rightButtonLabel: '확인',
			leftButtonLabel: '취소',
			rightButtonStyle: cs.lightBlueButton,
			leftButtonStyle: cs.whiteAndBlackButton,
			onRightButtonClick: () => {
				deleteProductMutation.mutate(productId);
				close();
			},
			onLeftButtonClick: () => {
				close();
			},
		});
	};

	const updateStockMutation = useMutation({
		mutationFn: (params: UpdateStockParams) => fetchUpdateProductStock(params),
		onSuccess: async (data, variables) => {
			const { productId, data: stock } = variables;
			const previousProductList = queryClient.getQueryData<ProductInfo[]>(['productList']);

			queryClient.setQueryData<ProductInfo[]>(['productList'], (oldData) => {
				if (!oldData) return [];
				return oldData.map((product) =>
					product.id === productId
						? {
								...product,
								priceCategories: product.priceCategories?.map((category) =>
									category.id === data.data ? { ...category, stock } : category,
								),
						  }
						: product,
				);
			});

			setQuantity((prevQuantity) => ({
				...prevQuantity,
				[productId]: stock,
			}));

			return { previousProductList };
		},
		onError: () => {
			open({
				width: '300px',
				height: '200px',
				title: '재고 업데이트 실패',
				main: <AlertMainTextBox text="재고 업데이트가 실패되었습니다." />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: close,
			});
		},
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: ['productList'],
			});
			open({
				width: '300px',
				height: '200px',
				title: '재고 업데이트 성공',
				main: <AlertMainTextBox text="재고가 업데이트 되었습니다." />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: close,
			});
		},
	});

	const handleUpdateStock = (productId: number) => {
		const categoryId = selectedKind[productId];
		const data = quantity[productId];

		if (categoryId) {
			updateStockMutation.mutate({ productId, categoryId: Number(categoryId), data });
			queryClient.invalidateQueries({
				queryKey: ['productDetails', productId],
			});
		} else {
			open({
				width: '300px',
				height: '200px',
				title: '카테고리 선택 오류',
				main: <AlertMainTextBox text="카테고리를 선택해주세요." />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: close,
			});
		}
	};

	return (
		<div style={{ border: `1px solid ${vars.color.lighterGray}` }}>
			<Flex
				justify="center"
				align="center"
				style={{ padding: '12px 18px', borderBottom: `1px solid ${vars.color.lightGray}` }}>
				<div className={s.darkGraySmallText} style={{ flex: '1' }}>
					순번
				</div>
				<div className={s.darkGraySmallText} style={{ flex: '1' }}></div>
				<div className={s.darkGraySmallText} style={{ flex: '2' }}>
					상품권명
				</div>
				<div className={s.darkGraySmallText} style={{ flex: '2' }}>
					로고
				</div>
				<div className={s.darkGraySmallText} style={{ flex: '2' }}>
					판매금액
				</div>
				<div className={s.darkGraySmallText} style={{ flex: '2.5' }}>
					수량관리
				</div>
				<div className={s.darkGraySmallText} style={{ flex: '3' }}>
					상품권관리
				</div>
			</Flex>
			{products?.data.map((product, index) => (
				<Flex
					key={product.id}
					align="center"
					style={{ padding: '12px 18px', borderBottom: `1px solid ${vars.color.lighterGray}` }}>
					<div className={s.darkGraySmallText} style={{ flex: '1' }}>
						{index + 1}
					</div>
					<div className={s.darkGraySmallText} style={{ flex: '1' }}>
						<Flex justify="center" align="center">
							<FiMenu style={{ width: '20px', height: '20px', color: vars.color.lightGray }} />
						</Flex>
					</div>
					<div className={s.darkGraySmallText} style={{ flex: '2' }}>
						{product.name}
					</div>
					<div className={s.darkGraySmallText} style={{ flex: '2' }}>
						{!product.logoImageUrl && (
							<Flex
								justify="center"
								align="center"
								style={{
									width: '50px',
									height: '50px',
									backgroundColor: '#959595',
									color: vars.color.white,
								}}></Flex>
						)}
						{product.logoImageUrl && (
							<img
								src={product.logoImageUrl}
								alt="상품권 로고 이미지"
								style={{ width: '50px', height: '50px' }}
							/>
						)}
					</div>
					<div className={s.darkGraySmallText} style={{ flex: '2' }}>
						<select
							name=""
							className={s.customSelect}
							onChange={(e) => handleSelectChange(e, product)}
							value={selectedKind?.[product.id]}>
							{product.priceCategories &&
								[...product.priceCategories]
									.sort((a, b) => a.price - b.price)
									.map((kind) => (
										<option key={kind.id} value={kind.id}>
											{kind.name}
										</option>
									))}
						</select>
					</div>
					<div className={s.darkGraySmallText} style={{ flex: '2.5' }}>
						<Flex justify="center" align="center">
							<Input
								type="number"
								value={quantity?.[product.id] || 0}
								onChange={(e) => handleQuantityChange(e, product)}
								style={{
									width: '50px',
									marginRight: '4px',
									padding: '4px',
									border: `1px solid ${vars.color.lighterGray}`,
									borderRadius: '5px',
									textAlign: 'center',
								}}
							/>
							<Button
								className={s.darkGraySmallText}
								style={{
									minWidth: '55px',
									padding: '4px',
									marginRight: '8px',
									color: vars.color.white,
									backgroundColor: vars.color.lighterGray,
									borderRadius: '5px',
								}}
								onClick={() => handleUpdateStock(product.id)}>
								수정
							</Button>
						</Flex>
					</div>
					<div className={s.darkGraySmallText} style={{ flex: '3' }}>
						<Flex justify="center" align="center">
							<Button
								className={s.darkGraySmallText}
								style={{
									minWidth: '55px',
									padding: '4px',
									marginRight: '8px',
									backgroundColor: vars.color.white,
									border: `1px solid ${vars.color.lighterGray}`,
									borderRadius: '5px',
								}}
								onClick={() => onSelectProduct(product.id)}>
								수정
							</Button>
							<Button
								className={s.darkGraySmallText}
								style={{
									minWidth: '55px',
									padding: '4px',
									backgroundColor: vars.color.white,
									border: `1px solid ${vars.color.lighterGray}`,
									borderRadius: '5px',
								}}
								onClick={() => handleDeleteProduct(product.id)}
								disabled={isDeleting}>
								삭제
							</Button>
						</Flex>
					</div>
				</Flex>
			))}
		</div>
	);
};

export default AdminProductList;
