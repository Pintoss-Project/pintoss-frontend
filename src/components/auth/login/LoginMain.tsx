import * as s from './LoginStyle.css';

import { Input } from '@/shared/components/input';
import { Flex } from '@/shared/components/layout';
import Spacing from '@/shared/components/layout/Spacing';
import { vars } from '@/shared/styles/theme.css';
import Link from 'next/link';

const LoginMain = () => {
	return (
		<div className={s.loginMainContainer}>
			<Spacing margin="18px" />
			<Flex direction="column">
				<Input name="email" placeholder="아이디(이메일)" className={s.loginInputStyle} />
				<Spacing margin="10px" />
				<Input
					name="password"
					type="password"
					placeholder="비밀번호를 입력해주세요"
					className={s.loginInputStyle}
				/>
				<Spacing margin="18px" />
			</Flex>
			<Flex justify="flex-end" align="center">
				<Link href="" className={s.grayText}>
					비밀번호 재설정
				</Link>
				<Link href="/register" className={s.blueText}>
					회원가입
				</Link>
			</Flex>
			<Spacing margin="17px" />
		</div>
	);
};

export default LoginMain;
