'use client';

import { useState } from 'react';
import Spacing from '@/shared/components/layout/Spacing';
import BoardWriter from './BoardWriter';
import { vars } from '@/shared/styles/theme.css';
import AdminBoardList from './AdminBoardList';

const AdminNoticeMain = () => {
	const [editBoard, setEditBoard] = useState<{ id: number; title: string; content: string } | null>(
		null,
	);

	const handleEdit = (board: { id: number; title: string; content: string }) => {
		setEditBoard(board);
	};

	return (
		<div
			style={{
				width: '100%',
				height: '400px',
				padding: '22px 30px',
				border: `1px solid ${vars.color.lighterGray}`,
			}}>
			<Spacing margin="10px" />
			<BoardWriter
				title={editBoard ? '공지사항 수정' : '공지사항 작성'}
				formId={'notice-writer-form'}
				editBoard={editBoard}
				resetEditBoard={() => setEditBoard(null)}
			/>
			<Spacing margin="10px" />
			<AdminBoardList type="notice" onEdit={handleEdit} />
		</div>
	);
};

export default AdminNoticeMain;
