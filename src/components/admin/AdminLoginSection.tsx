import { Input } from '@/shared/components/input';
import * as ls from '@/components/auth/login/LoginStyle.css';
import * as s from './AdminStyle.css';
import { Flex } from '@/shared/components/layout';
import Spacing from '@/shared/components/layout/Spacing';
import { Button } from '@/shared/components/button';
import { vars } from '@/shared/styles/theme.css';

const AdminLoginSection = () => {
	return (
		<Flex direction="column" justify="center" align="center" className={s.adminLoginContainer}>
			<div className={s.adminLoginFlexWrap}>
				<h1 style={{ fontSize: '30px', fontWeight: 'bold' }}>로그인</h1>
				<Spacing margin="40px" />
				<Input
					name="email"
					placeholder="이메일을 입력하세요"
					className={ls.loginInputStyle}
					style={{ width: '100%' }}
				/>
				<Spacing margin="10px" />
				<Input
					name="password"
					type="password"
					placeholder="비밀번호를 입력해주세요"
					className={ls.loginInputStyle}
					style={{ width: '100%' }}
				/>
				<Spacing margin="18px" />
				<Button color={vars.color.white} className={s.adminLoginButton}>
					로그인
				</Button>
			</div>
		</Flex>
	);
};

export default AdminLoginSection;
