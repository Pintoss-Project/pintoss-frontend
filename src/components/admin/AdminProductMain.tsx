'use client';

import { useState } from 'react';
import { Flex } from '@/shared/components/layout';
import ManageFeeBox from './ManageFeeBox';
import AddProductBox from './AddProductBox';
import AdminProductList from './AdminProductList';
import Spacing from '@/shared/components/layout/Spacing';

const AdminProductMain = () => {
	const [selectedProductId, setSelectedProductId] = useState<number | undefined>();

	const handleSelectProduct = (productId: number) => {
		setSelectedProductId(productId);
	};

	return (
		<div>
			<Flex>
				<ManageFeeBox />
				<AddProductBox productId={selectedProductId} />
			</Flex>
			<Spacing margin="50px" />
			<AdminProductList onSelectProduct={handleSelectProduct} />
		</div>
	);
};

export default AdminProductMain;
