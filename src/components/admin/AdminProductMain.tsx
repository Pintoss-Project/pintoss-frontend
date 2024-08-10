'use client';

import { useEffect, useState } from 'react';
import { Flex } from '@/shared/components/layout';
import ManageFeeBox from './ManageFeeBox';
import AddProductBox from './AddProductBox';
import AdminProductList from './AdminProductList';
import Spacing from '@/shared/components/layout/Spacing';
import { useQuery } from '@tanstack/react-query';
import { getProduct } from '@/app/api/product/getProduct';

const AdminProductMain = () => {
	const [selectedProductId, setSelectedProductId] = useState<number | undefined>();
	const [cardDiscount, setCardDiscount] = useState<number | undefined>();
	const [phoneDiscount, setPhoneDiscount] = useState<number | undefined>();

	const handleSelectProduct = (productId: number) => {
		setSelectedProductId(productId);
	};

	const { data: productDetails, isSuccess } = useQuery({
		queryKey: ['productDetails', selectedProductId],
		queryFn: () => getProduct(selectedProductId!),
		enabled: !!selectedProductId,
	});

	useEffect(() => {
		setCardDiscount(productDetails?.data.cardDiscount);
		setPhoneDiscount(productDetails?.data.phoneDiscount);
	}, [isSuccess]);

	return (
		<div>
			<Flex>
				<ManageFeeBox
					productId={selectedProductId}
					cardDiscount={cardDiscount}
					phoneDiscount={phoneDiscount}
				/>
				<AddProductBox productId={selectedProductId} />
			</Flex>
			<Spacing margin="50px" />
			<AdminProductList onSelectProduct={handleSelectProduct} />
		</div>
	);
};

export default AdminProductMain;
