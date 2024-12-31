import { useEffect, useState } from 'react';

const useSaleRate = (selectedType, product) => {
	const [saleRate, setSaleRate] = useState(product?.cardDiscount || 0);

	useEffect(() => {
		setSaleRate(selectedType === 'card' ? product?.cardDiscount : product?.phoneDiscount);
	}, [selectedType, product]);

	return saleRate;
};

export default useSaleRate;
