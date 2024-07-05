import * as s from '@/components/auth/AuthStyle.css';

import AuthHeader from '@/components/auth/AuthHeader';
import AuthSection from '@/components/auth/AuthSection';
import { Flex } from '@/shared/components/layout';
import RegisterMain from '@/components/auth/register/RegisterMain';
import RegisterButton from '@/components/auth/register/RegisterButton';

const Register = () => {
	return (
		<Flex justify="center" className={s.container}>
			<AuthSection
				header={<AuthHeader title="회원가입" />}
				main={<RegisterMain />}
				footer={<RegisterButton />}
				marginTop="84px"
				marginBottom="165px"
			/>
		</Flex>
	);
};

export default Register;
