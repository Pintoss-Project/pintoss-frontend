import Spacing from '@/shared/components/layout/Spacing';
import BoardWriter from './BoardWriter';
import { vars } from '@/shared/styles/theme.css';
import AdminBoardList from './AdminBoardList';

const AdminNoticeMain = () => {
	return (
		<div
			style={{
				width: '100%',
				height: '400px',
				padding: '22px 30px',
				border: `1px solid ${vars.color.lighterGray}`,
			}}>
			<Spacing margin="10px" />
			<BoardWriter title="공지사항 작성" formId={'notice-writer-form'} />
			<Spacing margin="10px" />
			<AdminBoardList type="notice" />
		</div>
	);
};

export default AdminNoticeMain;
