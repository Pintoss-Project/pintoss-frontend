"use client"

import AdminMainSection from '@/components/admin/AdminMainSection';
import { AdminUserMainSuspense } from '@/components/admin/AdminUserMain';
import { Suspense } from 'react';

const ManageUsers = () => {
	return (
		<Suspense fallback={null}>
			<AdminMainSection title="회원관리" main={<AdminUserMainSuspense />} />
		</Suspense>
	);
};

export default ManageUsers;
