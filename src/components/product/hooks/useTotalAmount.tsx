import { CartItem } from '@/models/cart';
import { VoucherDetailResponse } from '@/types/api';
import { useEffect, useState } from 'react';

const useTotalAmount = (
	cartItems:CartItem[], 
	priceCategories: VoucherDetailResponse[], 
	saleRate:number, selectedType: string
) => {
	const [totalAmount, setTotalAmount] = useState(0);
	const [finalAmount, setFinalAmount] = useState(0);

	useEffect(() => {
		const calculateAmounts = () => {
			const calculatedTotalAmount = cartItems.reduce((total, item) => {
				const category = priceCategories?.find((c) => c.voucherId === item.priceCategoryId);
				const price = category ? category.price : 0;
				const discountedPrice = price * (1 - saleRate / 100);
				return total + discountedPrice * item.quantity;
			}, 0);

			setTotalAmount(Math.round(calculatedTotalAmount));

			const calculatedFinalAmount =
				selectedType === 'phone' ? Math.round(calculatedTotalAmount * 1.1) : calculatedTotalAmount;

			setFinalAmount(calculatedFinalAmount);
		};

		calculateAmounts();
	}, [cartItems, priceCategories, saleRate, selectedType]);

	return { totalAmount, finalAmount };
};

export default useTotalAmount;
