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

const AdminFAQsMain = ({ editBoard, resetEditBoard, onDelete, onEdit }: Props) => {
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
				title={editBoard ? '자주 묻는 질문 수정' : '자주 묻는 질문 작성'}
				formId={'faqs-writer-form'}
				editBoard={editBoard}
				resetEditBoard={resetEditBoard}
			/>
			<Spacing margin="10px" />
			<AdminBoardList type="faqs" onEdit={onEdit} onDelete={onDelete} />
		</div>
	);
};

export default AdminFAQsMain;
