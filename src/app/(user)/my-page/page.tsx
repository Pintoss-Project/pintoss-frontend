import * as s from '@/components/PageStyle.css';
import PageSection from '@/components/PageSection';
import { Flex } from '@/shared/components/layout';
import MyPageMain from '@/components/user/MyPageMain';
import ProtectedRoute from '@/components/protect/ProtectedRoute';

const MyPage = () => {
	return (
		<ProtectedRoute>
			<Flex justify="center" className={s.container}>
				<PageSection header="마이페이지" main={<MyPageMain />} />
			</Flex>
		</ProtectedRoute>
	);
};

export default MyPage;
