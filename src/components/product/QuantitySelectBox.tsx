'use client';

import * as s from './ProductDetailStyle.css';

import { CartItem } from '@/models/cart';
import { PriceCategoryInfo } from '@/models/product';
import { Button } from '@/shared/components/button';
import { Divider, Flex } from '@/shared/components/layout';
import Spacing from '@/shared/components/layout/Spacing';
import { vars } from '@/shared/styles/theme.css';
import { VoucherDetailResponse } from '@/types/api';
import { useMemo } from 'react';
import { IoClose } from 'react-icons/io5';

interface Props {
	cartItems: CartItem[];
	priceCategories: VoucherDetailResponse[];
	onQuantityChange: (categoryId: number, newQuantity: number) => void;
	onRemoveItem: (index: number) => void;
}

const QuantitySelectBox = ({
	cartItems,
	priceCategories,
	onQuantityChange,
	onRemoveItem,
}: Props) => {

	const getPriceByCategoryId = useMemo(() => {
		const priceMap = new Map<number, number>();
		priceCategories.forEach((priceCategory) => {
			priceMap.set(priceCategory.voucherId, priceCategory.price);
		});
		return (categoryId: number) => priceMap.get(categoryId) as number;
	}, [priceCategories]);

	return (
		<div>
			{cartItems.map((item, index) => (
				<div key={index}>
					<Spacing margin="9px" />
					<Divider color={vars.color.paleGray} />
					<Spacing margin="15px" />
					<Flex justify="space-between" align="center" style={{ padding: '0 10px' }}>
						<div>
							<span className={s.darkGrayText} style={{ fontSize: '16px' }}>
								{item?.name}
							</span>
							<span style={{ color: vars.color.softRed, marginLeft: '10px' }}>
								{getPriceByCategoryId(item.priceCategoryId).toLocaleString()}원
							</span>
						</div>
						<div onClick={() => onRemoveItem(index)}>
							<IoClose style={{ width: '20px', height: '20px', color: '#BBBBBB' }} />
						</div>
					</Flex>
					<Spacing margin="16px" />
					<Flex justify="space-between" align="center" style={{ padding: '0 10px' }}>
						<Flex>
							<Button
								color={vars.color.lighterGray}
								className={s.quantityLeftButton}
								onClick={(e) => {
									e.preventDefault();
									onQuantityChange(item.priceCategoryId, item.quantity - 1)
								}}
								disabled={item.quantity <= 1}>
								-
							</Button>
							<Flex justify="center" align="center" className={s.quantityText}>
								{item.quantity}
							</Flex>
							<Button
								color={vars.color.darkGray}
								className={s.quantityRightButton}
								onClick={(e) => {
									e.preventDefault();
									onQuantityChange(item.priceCategoryId, item.quantity + 1)
								}}>
								+
							</Button>
						</Flex>
						<div style={{ fontSize: '18px', fontWeight: '600', color: vars.color.darkerGray }}>
							{(getPriceByCategoryId(item.priceCategoryId) * item.quantity).toLocaleString()} 원
						</div>
					</Flex>
					<Spacing margin="15px" />
					<Divider color={vars.color.lightestGray} />
				</div>
			))}
		</div>
	);
};

export default QuantitySelectBox;
