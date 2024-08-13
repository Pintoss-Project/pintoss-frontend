import * as s from '@/components/auth/AuthStyle.css';

import AuthHeader from '@/components/auth/AuthHeader';
import AuthSection from '@/components/auth/AuthSection';
import LoginMain from '@/components/auth/login/LoginMain';
import { Flex } from '@/shared/components/layout';

const Login = () => {
	return (
		<Flex justify="center" className={s.container}>
			<AuthSection header={<AuthHeader title="로그인" />} main={<LoginMain />} marginTop="100px" />
		</Flex>
	);
};

export default Login;
