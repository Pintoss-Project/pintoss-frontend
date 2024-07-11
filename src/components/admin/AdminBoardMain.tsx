'use client';

import { useSearchParams } from 'next/navigation';
import AdminMainSection from './AdminMainSection';
import AdminBannerMain from './AdminBannerMain';
import AdminNoticeMain from './AdminNoticeMain';
import AdminFAQsMain from './AdminFAQsMain';
import { useEffect, useState } from 'react';

const TITLE_MAP: Record<string, string> = {
	banner: '정보 및 배너관리',
	notice: '공지사항',
	faqs: '자주 묻는 질문',
};

const AdminBoardMain = () => {
	const [type, setType] = useState('banner');

	const searchParams = useSearchParams();
	const currentType = searchParams.get('type') as string;

	useEffect(() => {
		setType(currentType);
	}, [currentType]);

	return (
		<AdminMainSection
			title={TITLE_MAP[type]}
			main={
				type === 'banner' ? (
					<AdminBannerMain />
				) : type === 'notice' ? (
					<AdminNoticeMain />
				) : (
					<AdminFAQsMain />
				)
			}
		/>
	);
};

export default AdminBoardMain;
