'use client';

import { vars } from '@/shared/styles/theme.css';
import * as s from './AdminStyle.css';
import { Flex } from '@/shared/components/layout';
import { FiMenu } from 'react-icons/fi';
import { useState, useEffect, ChangeEvent } from 'react';
import { Button } from '@/shared/components/button';
import { Input } from '@/shared/components/input';

interface Kind {
	id: string;
	name: string;
	quantity: number;
}

interface Product {
	product_id: string;
	product_name: string;
	logo: string;
	kinds: Kind[];
}

const PRODUCT_LIST: Product[] = [
	{
		product_id: '001',
		product_name: '컬쳐랜드',
		logo: '로고',
		kinds: [
			{ id: '1', name: '3천원권', quantity: 15 },
			{ id: '2', name: '5천원권', quantity: 20 },
			{ id: '3', name: '1만원권', quantity: 30 },
		],
	},
	{
		product_id: '002',
		product_name: '북앤라이프 도서상품권',
		logo: '로고',
		kinds: [
			{ id: '1', name: '3천원권', quantity: 15 },
			{ id: '2', name: '5천원권', quantity: 20 },
			{ id: '3', name: '1만원권', quantity: 30 },
		],
	},
	{
		product_id: '003',
		product_name: '올리브영 상품권',
		logo: '로고',
		kinds: [
			{ id: '1', name: '3천원권', quantity: 15 },
			{ id: '2', name: '5천원권', quantity: 20 },
			{ id: '3', name: '1만원권', quantity: 30 },
		],
	},
	{
		product_id: '004',
		product_name: '문화상품권',
		logo: '로고',
		kinds: [
			{ id: '1', name: '3천원권', quantity: 15 },
			{ id: '2', name: '5천원권', quantity: 20 },
			{ id: '3', name: '1만원권', quantity: 30 },
		],
	},
	{
		product_id: '005',
		product_name: '넥슨카드',
		logo: '로고',
		kinds: [
			{ id: '1', name: '3천원권', quantity: 15 },
			{ id: '2', name: '5천원권', quantity: 20 },
			{ id: '3', name: '1만원권', quantity: 30 },
		],
	},
	{
		product_id: '006',
		product_name: '해피머니',
		logo: '로고',
		kinds: [
			{ id: '1', name: '3천원권', quantity: 15 },
			{ id: '2', name: '5천원권', quantity: 20 },
			{ id: '3', name: '1만원권', quantity: 30 },
		],
	},
];

const AdminProductList = () => {
	const [selectedKind, setSelectedKind] = useState<{ [key: string]: string }>({});
	const [quantity, setQuantity] = useState<{ [key: string]: number }>({});

	useEffect(() => {
		const initialSelected = PRODUCT_LIST.reduce((acc, product) => {
			acc[product.product_id] = product.kinds[0].id;
			return acc;
		}, {} as { [key: string]: string });

		const initialQuantity = PRODUCT_LIST.reduce((acc, product) => {
			acc[product.product_id] = product.kinds[0].quantity;
			return acc;
		}, {} as { [key: string]: number });

		setSelectedKind(initialSelected);
		setQuantity(initialQuantity);
	}, []);

	const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>, product: Product) => {
		const kind = product.kinds.find((k) => k.id === event.target.value);
		if (kind) {
			setSelectedKind((prevState) => ({
				...prevState,
				[product.product_id]: kind.id,
			}));

			setQuantity((prevState) => ({
				...prevState,
				[product.product_id]: kind.quantity,
			}));
		}
	};

	const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>, product: Product) => {
		setQuantity((prevState) => ({
			...prevState,
			[product.product_id]: Number(event.target.value),
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
			{PRODUCT_LIST.map((product, index) => (
				<Flex
					key={product.product_id}
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
						{product.product_name}
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
							value={selectedKind[product.product_id]}>
							{product.kinds.map((kind) => (
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
								value={quantity[product.product_id] || 0}
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