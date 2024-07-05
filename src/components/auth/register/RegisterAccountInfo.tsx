import * as s from './RegisterStyle.css';

import Spacing from '@/shared/components/layout/Spacing';
import RegisterInputBox from './RegisterInputBox';

const RegisterAccountInfo = () => {
	return (
		<div style={{ marginLeft: '10px' }}>
			<RegisterInputBox name="email" label="아이디(이메일)" star placeholder="abc@site.com" />
			<Spacing margin="5px" />
			<p className={s.pText}>비밀번호찾기, 주문내역 발송 등에 쓰이므로 정확히 입력해 주세요.</p>
			<Spacing margin="20px" />
			<RegisterInputBox
				name="password"
				label="비밀번호"
				type="password"
				star
				placeholder="비밀번호(영문+숫자, 6~20자)"
			/>
			<Spacing margin="20px" />
			<RegisterInputBox
				name="confirmPassword"
				label="비밀번호 확인"
				type="password"
				star
				placeholder="비밀번호를 한번 더 입력해주세요."
			/>
			<Spacing margin="40px" />
		</div>
	);
};

export default RegisterAccountInfo;
