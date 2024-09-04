import * as s from '@/components/auth/AuthStyle.css';
import AuthHeader from '@/components/auth/AuthHeader';
import AuthSection from '@/components/auth/AuthSection';
import PasswordResetPersonalInfo from '@/components/auth/reset/PasswordResetPersonalInfo';
import { Flex } from '@/shared/components/layout';

const ResetPasswordPage = () => {
	return (
		<Flex justify="center" className={s.container} style={{ minHeight: '700px' }}>
			<AuthSection
				header={<AuthHeader title="비밀번호 재설정" />}
				main={<PasswordResetPersonalInfo />}
				marginTop="100px"
			/>
		</Flex>
	);
};

export default ResetPasswordPage;
