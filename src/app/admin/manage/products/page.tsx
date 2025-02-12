"use client"

import AdminMainSection from '@/components/admin/AdminMainSection';
import { AdminProductMainSuspense } from '@/components/admin/AdminProductMain';
import { Suspense } from 'react';

const ManageProducts = () => {
	return (
		<Suspense fallback={null}>
			<AdminMainSection title="상품권 관리" main={<AdminProductMainSuspense />} />
		</Suspense>
	);
};

export default ManageProducts;
