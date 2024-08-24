'use client';

import Spacing from '@/shared/components/layout/Spacing';
import BoardWriter from './BoardWriter';
import { vars } from '@/shared/styles/theme.css';
import AdminBoardList from './AdminBoardList';

interface Props {
	editBoard: { id: number; title: string; content: string; images?: string[] } | null;
	resetEditBoard: () => void;
	onDelete: () => void;
	onEdit: (board: { id: number; title: string; content: string; images?: string[] }) => void;
}

const AdminNoticeMain = ({ editBoard, resetEditBoard, onDelete, onEdit }: Props) => {
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
				key={editBoard ? editBoard.id : 'new'}
				title={editBoard ? '공지사항 수정' : '공지사항 작성'}
				formId={'notice-writer-form'}
				editBoard={editBoard}
				resetEditBoard={resetEditBoard}
			/>
			<Spacing margin="10px" />
			<AdminBoardList type="notice" onEdit={onEdit} onDelete={onDelete} />
		</div>
	);
};

export default AdminNoticeMain;
