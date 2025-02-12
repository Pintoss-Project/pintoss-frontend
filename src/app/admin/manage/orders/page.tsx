"use client"

import AdminMainSection from '@/components/admin/AdminMainSection';
import { AdminOrderMainWithSuspense } from '@/components/admin/AdminOrderMain';
import { Suspense } from 'react';

const ManageOrders = () => {
	return (
		<Suspense fallback={null}>
			<AdminMainSection title="주문내역" main={<AdminOrderMainWithSuspense />} />
		</Suspense>
	);
};

export default ManageOrders;
