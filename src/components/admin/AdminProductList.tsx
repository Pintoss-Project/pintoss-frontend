'use client';

import { vars } from '@/shared/styles/theme.css';
import * as s from './AdminStyle.css';
import * as cs from '@/shared/styles/common.css';
import { Flex } from '@/shared/components/layout';
import { FiMenu } from 'react-icons/fi';
import { useState, useEffect, ChangeEvent, Dispatch, SetStateAction } from 'react';
import { Button } from '@/shared/components/button';
import { Input } from '@/shared/components/input';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getProductList } from '@/app/api/product/getProductList';
import { ProductInfo } from '@/models/product';
import { deleteProduct } from '@/app/api/product/deleteProduct';
import useAlertContext from '@/hooks/useAlertContext';
import AlertMainTextBox from '@/shared/components/alert/AlertMainTextBox';
import { updateStock, UpdateStockParams } from '@/app/api/product/updateStock';

interface Props {
	onSelectProduct: (productId: number) => void;
}

const AdminProductList = ({ onSelectProduct }: Props) => {
	const [selectedKind, setSelectedKind] = useState<{ [key: string]: string }>({});
	const [quantity, setQuantity] = useState<{ [key: string]: number }>({});

	const { open, close } = useAlertContext();

	const queryClient = useQueryClient();

	const { data: products, isSuccess } = useQuery({
		queryKey: ['productList'],
		queryFn: () => getProductList(''),
	});

	useEffect(() => {
		if (isSuccess && products) {
			const initialSelected = products.data.reduce((acc, product) => {
				const sortedCategories = product.priceCategories
					? [...product.priceCategories].sort((a, b) => a.price - b.price)
					: [];
				acc[product.id] = String(sortedCategories[0]?.id || '');
				return acc;
			}, {} as { [key: string]: string });

			const initialQuantity = products.data.reduce((acc, product) => {
				acc[product.id] = product.priceCategories?.[0]?.stock || 0;
				return acc;
			}, {} as { [key: string]: number });

			setSelectedKind(initialSelected);
			setQuantity(initialQuantity);
		}
	}, [isSuccess, products]);

	const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>, product: ProductInfo) => {
		const kind = product.priceCategories?.find((k) => k.id === +event.target.value);
		if (kind) {
			setSelectedKind((prevState) => ({
				...prevState,
				[product.id]: kind.id,
			}));

			setQuantity((prevState) => ({
				...prevState,
				[product.id]: kind.stock,
			}));
		}
	};

	const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>, product: ProductInfo) => {
		setQuantity((prevState) => ({
			...prevState,
			[product.id]: Number(event.target.value),
		}));
	};

	const deleteProductMutation = useMutation({
		mutationFn: (productId: number) => deleteProduct(productId),
		onMutate: async (productId: number) => {
			await queryClient.invalidateQueries({
				queryKey: ['productList'],
			});

			const previousProductList = queryClient.getQueryData(['productList']);

			queryClient.setQueryData(['productList'], (old: any) => {
				return {
					...old,
					data: old.data.filter((product: ProductInfo) => product.id !== productId),
				};
			});

			return { previousProductList };
		},
		onError: (err, productId, context) => {
			queryClient.setQueryData(['productList'], context?.previousProductList);

			open({
				width: '300px',
				height: '200px',
				title: '상품권 삭제 실패',
				main: <AlertMainTextBox text="상품권 삭제가 실패되었습니다." />,
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
				title: '상품권 삭제 성공',
				main: <AlertMainTextBox text="상품권 삭제가 완료되었습니다." />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: close,
			});
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
		mutationFn: (params: UpdateStockParams) => updateStock(params),
		onMutate: async (updatedStock) => {
			const previousProductList = queryClient.getQueryData<ProductInfo[]>(['productList']);

			queryClient.setQueryData(['productList'], (oldData: any) => {
				return {
					...oldData,
					data: oldData.data.map((product: ProductInfo) =>
						product.id === updatedStock.productId
							? {
									...product,
									priceCategories: product.priceCategories?.map((category) =>
										category.id === updatedStock.categoryId
											? { ...category, stock: updatedStock.data }
											: category,
									),
							  }
							: product,
					),
				};
			});

			return { previousProductList };
		},
		onError: (err, newStock, context) => {
			queryClient.setQueryData(['productList'], context?.previousProductList);
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
						<Flex
							justify="center"
							align="center"
							style={{
								width: '50px',
								height: '50px',
								backgroundColor: '#959595',
								color: vars.color.white,
							}}>
							{product.logo}
						</Flex>
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
								onClick={() => handleDeleteProduct(product.id)}>
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
