import { Button } from '@/shared/components/button';
import Spacing from '@/shared/components/layout/Spacing';
import * as cs from '@/shared/styles/common.css';
import { vars } from '@/shared/styles/theme.css';
import { fetchApi } from '@/utils/fetchApi';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import RegisterInputBox from './RegisterInputBox';
import * as s from './RegisterStyle.css';

interface Props {
	authData: {
		name?: string;
		phone?: string;
	};
}

const RegisterPersonalInfo = ({ authData }: Props) => {
	const [errorMessage, setErrorMessage] = useState('');
	const methods = useForm();
	const { setValue } = methods;

	useEffect(() => {
		if (authData.name) setValue('name', authData.name);
		if (authData.phone) setValue('phone', authData.phone);
	}, [authData, setValue]);

	const handleAuthClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		try {
			const requestData = await fetchApi('/api/niceid/request', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					returnurl: 'http://localhost:3000/register/nice',
				}),
			});

			const { token_version_id, enc_data, integrity_value } = requestData;

			if (!token_version_id || !enc_data || !integrity_value) {
				throw new Error('필수 데이터가 누락되었습니다.');
			}

			console.log('Request Data:', requestData);

			const formWindow = window.open('', '_blank', 'width=500,height=600');
			if (formWindow) {
				const formDocument = formWindow.document;
				const form = formDocument.createElement('form');
				form.method = 'POST';
				form.action = 'https://nice.checkplus.co.kr/CheckPlusSafeModel/service.cb';

				const inputs = [
					{ name: 'm', value: 'service' },
					{ name: 'token_version_id', value: token_version_id },
					{ name: 'enc_data', value: enc_data },
					{ name: 'integrity_value', value: integrity_value },
				];

				inputs.forEach(({ name, value }) => {
					const input = formDocument.createElement('input');
					input.type = 'hidden';
					input.name = name;
					input.value = value;
					form.appendChild(input);
				});

				formDocument.body.appendChild(form);

				form.submit();
			} else {
				throw new Error('팝업 차단으로 인해 새 창을 열 수 없습니다.');
			}
		} catch (error) {
			console.error('Authentication error:', error);
			setErrorMessage('인증 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
		}
	};

	return (
		<FormProvider {...methods}>
			<div style={{ marginLeft: '10px' }}>
				<div style={{ width: '100%', textAlign: 'left' }}>
					<span className={s.baseText}>휴대폰인증</span>
					<span className={s.skyBlueText}>[필수]</span>
				</div>
				<Spacing margin="8px" />
				<div className={s.phoneInfoBox}>
					<p className={s.redText}>* 상품권 구매는 휴대폰인증을 필수로 하셔야합니다.</p>
					<Spacing margin="5px" />
					<p className={s.smallText}>
						* 본인명의 휴대폰이 아닐 경우 추가인증을 요구 할 수 있습니다.
					</p>
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
				<RegisterInputBox
					name="name"
					label="이름"
					star
					placeholder="본인인증 후 자동입력됩니다."
					disabled
				/>
				<Spacing margin="20px" />
				<RegisterInputBox
					name="phone"
					label="휴대폰"
					star
					placeholder="본인인증 후 자동입력됩니다."
					disabled
				/>
				<Spacing margin="40px" />
			</div>
		</FormProvider>
	);
};

export default RegisterPersonalInfo;
