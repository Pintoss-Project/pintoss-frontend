'use client';

import { fetchBoardList } from '@/controllers/board/fetchBoardList';
import { Button } from '@/shared/components/button';
import { Flex } from '@/shared/components/layout';
import Spacing from '@/shared/components/layout/Spacing';
import { vars } from '@/shared/styles/theme.css';
import { formatDate } from '@/utils/formatDate';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import * as s from './HomeStyle.css';

const HomeAnnouncementsBoard = () => {
	const router = useRouter();

	const { data: noticeList } = useQuery({
		queryKey: ['boardList', 'NOTICE'],
		queryFn: () => fetchBoardList('NOTICE'),
	});

	const { data: faqList } = useQuery({
		queryKey: ['boardList', 'FAQS'],
		queryFn: () => fetchBoardList('FAQS'),
	});

	const handleListClick = () => {
		router.push('/customer-service');
	};

	return (
		<Flex className={s.homeAnnouncementsBoard}>
			<Flex direction="column" align="center" className={s.homeAnnounceBox}>
				<div className={s.homeAnnounceTitleBox}>
					<div className={s.announceText}>NOTICE</div>
					<Spacing margin="8px" />
					<h3 className={s.homeAnnounceInfoTitle}>공지사항</h3>
				</div>
				<Spacing margin="16px" />
				<div style={{ width: '100%' }}>
					{noticeList?.data.slice(0, 4).map((item) => (
						<Flex
							key={item.id}
							align="center"
							className={s.homeAnnounceInfoBox}
							onClick={handleListClick}
							style={{ cursor: 'pointer' }}>
							<span style={{ marginRight: '12px', color: 'orange' }}>
								{formatDate(item.createdAt as string)}
							</span>
							<p style={{ color: vars.color.darkGray }}>{item.title}</p>
						</Flex>
					))}
				</div>
				<Spacing margin="24px" />
				<Button color={vars.color.white} className={s.moreButton} onClick={handleListClick}>
					더보기
				</Button>
			</Flex>
			<Flex direction="column" align="center" className={s.homeAnnounceBox}>
				<div className={s.homeAnnounceTitleBox}>
					<div className={s.announceText}>FAQ</div>
					<Spacing margin="8px" />
					<h3 className={s.homeAnnounceInfoTitle}>자주 묻는 질문</h3>
				</div>
				<Spacing margin="16px" />
				<div style={{ width: '100%' }}>
					{faqList?.data.slice(0, 4).map((item) => (
						<Flex
							key={item.id}
							align="center"
							className={s.homeAnnounceInfoBox}
							onClick={handleListClick}
							style={{ cursor: 'pointer' }}>
							<span style={{ marginRight: '12px', color: 'orange' }}>
								{formatDate(item.createdAt as string)}
							</span>
							<p style={{ color: vars.color.darkGray }}>{item.title}</p>
						</Flex>
					))}
				</div>
				<Spacing margin="24px" />
				<Button color={vars.color.white} className={s.moreButton} onClick={handleListClick}>
					더보기
				</Button>
			</Flex>
		</Flex>
	);
};

export default HomeAnnouncementsBoard;
