import * as s from '@/components/auth/AuthStyle.css';
import { cookies } from 'next/headers';
import AuthHeader from '@/components/auth/AuthHeader';
import AuthSection from '@/components/auth/AuthSection';
import { Flex } from '@/shared/components/layout';
import RegisterMain from '@/components/auth/register/RegisterMain';

const Register = () => {
	const cookieStore = cookies();
	const nameFromCookie = cookieStore.get('name');
	const emailFromCookie = cookieStore.get('email');
	const accessTokenCookie = cookieStore.get('accessToken');

	return (
		<Flex justify="center" className={s.container}>
			<AuthSection
				header={<AuthHeader title="회원가입" />}
				main={
					<RegisterMain
						oAUthEmail={emailFromCookie?.value}
						oAuthName={nameFromCookie?.value}
						accessToken={accessTokenCookie?.value}
					/>
				}
				marginTop="84px"
			/>
		</Flex>
	);
};

export default Register;
