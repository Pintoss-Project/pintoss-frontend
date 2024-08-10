'use client';

import { vars } from '@/shared/styles/theme.css';
import * as s from './AdminStyle.css';
import { Flex } from '@/shared/components/layout';
import { FiMenu } from 'react-icons/fi';
import { useState, useEffect, ChangeEvent } from 'react';
import { Button } from '@/shared/components/button';
import { Input } from '@/shared/components/input';
import { useQuery } from '@tanstack/react-query';
import { getProductList } from '@/app/api/product/getProductList';
import { ProductInfo } from '@/models/product';

const AdminProductList = () => {
	const [selectedKind, setSelectedKind] = useState<{ [key: string]: string }>({});
	const [quantity, setQuantity] = useState<{ [key: string]: number }>({});

	const { data: products } = useQuery({
		queryKey: ['productList'],
		queryFn: getProductList,
	});

	useEffect(() => {
		const initialSelected = products?.data.reduce((acc, product) => {
			acc[product.id] = String(product?.priceCategories?.[0].id);
			return acc;
		}, {} as { [key: string]: string });

		const initialQuantity = products?.data.reduce((acc, product) => {
			acc[product.id] = product?.priceCategories?.[0].stock as number;
			return acc;
		}, {} as { [key: string]: number });

		setSelectedKind(initialSelected as { [key: string]: string });
		setQuantity(initialQuantity as { [key: string]: number });
	}, []);

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
							value={selectedKind[product.id]}>
							{product.priceCategories?.map((kind) => (
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
								value={quantity[product.id] || 0}
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
								}}>
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
								}}>
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
								}}>
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
