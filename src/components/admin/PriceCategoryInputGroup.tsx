'use client';

import { Button } from '@/shared/components/button';
import { Input } from '@/shared/components/input';
import { Flex } from '@/shared/components/layout';
import { vars } from '@/shared/styles/theme.css';
import { PriceCategoryInfoFormData } from '@/utils/validation/product';
import { useState } from 'react';
import * as s from './AdminStyle.css';

interface Props {
	onAddCategory: (category: PriceCategoryInfoFormData) => void;
}

const PriceCategoryInputGroup = ({ onAddCategory }: Props) => {
	const [priceName, setPriceName] = useState<string>('');
	const [price, setPrice] = useState<number | ''>('');

	const handleAddClick = () => {
		if (priceName && price) {
			onAddCategory({ name: priceName, price: Number(price) });
			setPriceName('');
			setPrice('');
		}
	};

	return (
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
				<div style={{ marginRight: '8px', borderBottom: `1px solid ${vars.color.lighterGray}` }}>
					<Input
						value={priceName}
						onChange={(e) => setPriceName(e.target.value)}
						placeholder="금액명"
						className={s.rateInputStyle}
						style={{ textAlign: 'left', width: '100%' }}
					/>
				</div>
				<div style={{ marginRight: '8px', borderBottom: `1px solid ${vars.color.lighterGray}` }}>
					<Input
						type="number"
						value={price}
						onChange={(e) => setPrice(Number(e.target.value))}
						step="1000"
						placeholder="상품금액(원)"
						className={s.rateInputStyle}
						style={{ textAlign: 'left', width: '100%' }}
					/>
				</div>
				<Button
					color={vars.color.black}
					style={{
						minWidth: '40px',
						padding: '4px',
						backgroundColor: vars.color.white,
						border: `1px solid ${vars.color.lightestGray}`,
					}}
					onClick={handleAddClick}>
					추가
				</Button>
			</Flex>
		</Flex>
	);
};

export default PriceCategoryInputGroup;
