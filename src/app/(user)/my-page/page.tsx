import * as s from '@/components/PageStyle.css';

import PageSection from '@/components/PageSection';
import { Flex } from '@/shared/components/layout';
import MyPageMain from '@/components/user/MyPageMain';

const MyPage = () => {
	return (
		<Flex justify="center" className={s.container}>
			<PageSection header="마이페이지" main={<MyPageMain />} />
		</Flex>
	);
};

export default MyPage;
