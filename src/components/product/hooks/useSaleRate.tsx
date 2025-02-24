import { VoucherProviderListResponse } from '@/types/api';
import { useEffect, useState } from 'react';

const useSaleRate = (selectedType: string, product:VoucherProviderListResponse) => {
	const [saleRate, setSaleRate] = useState(product?.discount.cardDiscount || 0);

	useEffect(() => {
		setSaleRate(selectedType === 'card' ? product?.discount.cardDiscount : product?.discount.phoneDiscount);
	}, [selectedType, product]);

	return saleRate;
};

export default useSaleRate;
