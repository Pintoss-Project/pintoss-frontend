'use client';

import { Flex } from '@/shared/components/layout';
import Spacing from '@/shared/components/layout/Spacing';
import { useQueryClient } from '@tanstack/react-query';
import { Suspense, useState } from 'react';
import AddProductBox from './AddProductBox';
import AdminProductList from './AdminProductList';
import ManageFeeBox from './ManageFeeBox';
import Spinner from '@/shared/components/spinner/Spinner';

const AdminProductMain = () => {
	const [selectedProductId, setSelectedProductId] = useState<number | undefined>();
	const [isEditing, setIsEditing] = useState<boolean>(false);

	const queryClient = useQueryClient();

	const handleSelectProduct = (productId: number) => {
		setSelectedProductId(productId);
		setIsEditing(true);

		queryClient.invalidateQueries({
			queryKey: ['productDetails', selectedProductId],
		});
	};

	const handleResetEdit = () => {
		setIsEditing(false);
		setSelectedProductId(undefined);
	};

	return (
		<div>
			<Flex>
				<ManageFeeBox productId={selectedProductId} />
				<AddProductBox
					productId={selectedProductId}
					setSelectedProductId={setSelectedProductId}
					setIsEditing={setIsEditing}
					isEditing={isEditing}
				/>
			</Flex>
			<Spacing margin="50px" />
			<AdminProductList onSelectProduct={handleSelectProduct} onResetEdit={handleResetEdit} />
		</div>
	);
};

export function AdminProductMainSuspense() {
	return (
		<Suspense fallback={<Spinner />}>
			<AdminProductMain />
		</Suspense>
	);
}