"use client"

import { AdminBoardMainWithSuspense } from '@/components/admin/AdminBoardMain';
import { Suspense } from 'react';

const ManageBoards = () => {
	return (
		<Suspense fallback={null}>
			<AdminBoardMainWithSuspense />
		</Suspense>
	);
};

export default ManageBoards;
