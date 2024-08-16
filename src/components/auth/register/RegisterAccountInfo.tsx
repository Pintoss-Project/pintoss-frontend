import * as s from './RegisterStyle.css';

import Spacing from '@/shared/components/layout/Spacing';
import RegisterInputBox from './RegisterInputBox';
import { useSearchParams } from 'next/navigation';

const RegisterAccountInfo = () => {
	const searchParam = useSearchParams();
	const isOAuth = searchParam.get('oauth');

	return (
		<div style={{ marginLeft: '10px' }}>
			<RegisterInputBox name="email" label="아이디(이메일)" star placeholder="abc@site.com" />
			<Spacing margin="5px" />
			<p className={s.pText}>비밀번호찾기, 주문내역 발송 등에 쓰이므로 정확히 입력해 주세요.</p>
			<Spacing margin="20px" />
			{isOAuth !== 'true' && (
				<>
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
				</>
			)}
			{isOAuth === 'true' && (
				<RegisterInputBox
					name="inflow"
					label="유입경로"
					star
					placeholder="예) 네이버 검색, 유튜버(BJ)를 통해"
				/>
			)}
			<Spacing margin="40px" />
		</div>
	);
};

export default RegisterAccountInfo;
