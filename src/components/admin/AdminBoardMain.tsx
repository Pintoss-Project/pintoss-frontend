'use client';

import { useSearchParams } from 'next/navigation'
import AdminMainSection from './AdminMainSection';
import AdminBannerMain from './AdminBannerMain';
import AdminNoticeMain from './AdminNoticeMain';
import AdminFAQsMain from './AdminFAQsMain';
import { useEffect, useState } from 'react';
import Spinner from '@/shared/components/spinner/Spinner';
import { Suspense } from 'react';

const TITLE_MAP: Record<string, string> = {
	banner: '정보 및 배너관리',
	notice: '공지사항',
	faqs: '자주 묻는 질문',
};

interface EditBoard {
	id: number;
	title: string;
	content: string;
	images?: string[];
}

const AdminBoardMain = () => {
	const [type, setType] = useState('banner');
	const [editBoard, setEditBoard] = useState<EditBoard | null>(null);

	const searchParams = useSearchParams();
	const currentType = searchParams.get('type') as string;

	useEffect(() => {
		setType(currentType);
	}, [currentType]);

	const handleEdit = (board: EditBoard) => {
		setEditBoard(board);
	};

	const resetEditBoard = () => {
		setEditBoard(null);
	};

	const handleDelete = () => {
		resetEditBoard();
	};

	return (
		<AdminMainSection
			title={TITLE_MAP[type]}
			main={
				type === 'banner' ? (
					<AdminBannerMain />
				) : type === 'notice' ? (
					<AdminNoticeMain
						editBoard={editBoard}
						resetEditBoard={resetEditBoard}
						onDelete={handleDelete}
						onEdit={handleEdit}
					/>
				) : (
					<AdminFAQsMain
						editBoard={editBoard}
						resetEditBoard={resetEditBoard}
						onDelete={handleDelete}
						onEdit={handleEdit}
					/>
				)
			}
		/>
	);
};

export function AdminBoardMainWithSuspense() {
	return (
		<Suspense fallback={<Spinner />}>
			<AdminBoardMain />
		</Suspense>
	);
}
