'use client';

import * as s from './ProductDetailStyle.css';

import { CartItem } from '@/models/cart';
import { Button } from '@/shared/components/button';
import { Divider, Flex } from '@/shared/components/layout';
import Spacing from '@/shared/components/layout/Spacing';
import { vars } from '@/shared/styles/theme.css';
import { IoClose } from 'react-icons/io5';

interface Props {
	cartItems: CartItem[];
	originalPrices: { [categoryId: number]: number };
	onQuantityChange: (updatedItems: CartItem[]) => void;
	onRemoveItem: (index: number) => void;
}

const QuantitySelectBox = ({
	cartItems,
	originalPrices,
	onQuantityChange,
	onRemoveItem,
}: Props) => {
	const handleQuantityChange = (categoryId: number, newQuantity: number) => {
		const updatedItems = cartItems.map((item) =>
			item.priceCategoryId === categoryId ? { ...item, quantity: newQuantity } : item,
		);
		onQuantityChange(updatedItems);
	};

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
								{originalPrices?.[item.priceCategoryId].toLocaleString()}원
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
								onClick={() => handleQuantityChange(item.priceCategoryId, item.quantity - 1)}
								disabled={item.quantity <= 1}>
								-
							</Button>
							<Flex justify="center" align="center" className={s.quantityText}>
								{item.quantity}
							</Flex>
							<Button
								color={vars.color.darkGray}
								className={s.quantityRightButton}
								onClick={() => handleQuantityChange(item.priceCategoryId, item.quantity + 1)}>
								+
							</Button>
						</Flex>
						<div style={{ fontSize: '18px', fontWeight: '600', color: vars.color.darkerGray }}>
							{(+originalPrices?.[item.priceCategoryId] * item.quantity).toLocaleString()} 원
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
