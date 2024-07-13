import Spacing from '@/shared/components/layout/Spacing';
import { vars } from '@/shared/styles/theme.css';
import BoardWriter from './BoardWriter';
import AdminBoardList from './AdminBoardList';

const AdminFAQsMain = () => {
	return (
		<div
			style={{
				width: '100%',
				height: '400px',
				padding: '22px 30px',
				border: `1px solid ${vars.color.lighterGray}`,
			}}>
			<Spacing margin="10px" />
			<BoardWriter title="자주 묻는 질문 작성" formId={'faqs-writer-form'} />
			<Spacing margin="10px" />
			<AdminBoardList type="faqs" />
		</div>
	);
};

export default AdminFAQsMain;
