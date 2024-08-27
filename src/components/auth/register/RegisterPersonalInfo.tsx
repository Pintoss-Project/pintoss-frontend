import * as cs from '@/shared/styles/common.css';
import * as s from './RegisterStyle.css';
import Spacing from '@/shared/components/layout/Spacing';
import RegisterInputBox from './RegisterInputBox';
import { Button } from '@/shared/components/button';
import { vars } from '@/shared/styles/theme.css';
import { useState } from 'react';

// Common fetch request function
const fetchApi = async (url: string, options: RequestInit) => {
	const response = await fetch(url, options);
	if (!response.ok) {
		const errorMessage = `Error: ${response.status} ${response.statusText}`;
		throw new Error(errorMessage);
	}
	return response.json();
};

const RegisterPersonalInfo = () => {
	const [errorMessage, setErrorMessage] = useState('');

	const handleAuthClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		try {
			// Step 1: Get Access Token
			const tokenData = await fetchApi('/api/niceid/access-token', { method: 'POST' });
			const accessToken = tokenData.dataBody.access_token;

			console.log('Access Token:', accessToken);

			// Step 2: Request Encrypted Token using the Access Token
			const timestamp = Math.floor(new Date().getTime() / 1000);
			const clientId = process.env.NEXT_PUBLIC_NICE_CLIENT_ID || '';

			const cryptoData = await fetchApi('/api/niceid/encrypted-token', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ accessToken, timestamp, clientId }),
			});

			const { token_val, site_code } = cryptoData.dataBody;

			console.log('Token Value:', token_val);
			console.log('Site Code:', site_code);

			// Step 3: Open authentication popup
			window.open(
				`https://niceapi.co.kr/checkplus/main?token_val=${token_val}&site_code=${site_code}`,
				'AuthPopup',
				'width=500,height=600',
			);
		} catch (error) {
			console.error('Authentication error:', error);
			setErrorMessage('인증 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
		}
	};

	return (
		<div style={{ marginLeft: '10px' }}>
			<div style={{ width: '100%', textAlign: 'left' }}>
				<span className={s.baseText}>휴대폰인증</span>
				<span className={s.skyBlueText}>[필수]</span>
			</div>
			<Spacing margin="8px" />
			<div className={s.phoneInfoBox}>
				<p className={s.redText}>* 상품권 구매는 휴대폰인증을 필수로 하셔야합니다.</p>
				<Spacing margin="5px" />
				<p className={s.smallText}>* 본인명의 휴대폰이 아닐 경우 추가인증을 요구 할 수 있습니다.</p>
				<Spacing margin="30px" />
				{errorMessage && <p className={s.redText}>{errorMessage}</p>}
				<Button
					color={vars.color.lightBlue}
					className={cs.whiteAndBlueButton}
					onClick={handleAuthClick}>
					휴대폰 본인 인증하기
				</Button>
			</div>
			<Spacing margin="15px" />
			<RegisterInputBox name="name" label="이름" star placeholder="본인인증 후 자동입력됩니다." />
			<Spacing margin="20px" />
			<RegisterInputBox
				name="phone"
				label="휴대폰"
				star
				placeholder="본인인증 후 자동입력됩니다."
			/>
			<Spacing margin="40px" />
		</div>
	);
};

export default RegisterPersonalInfo;
