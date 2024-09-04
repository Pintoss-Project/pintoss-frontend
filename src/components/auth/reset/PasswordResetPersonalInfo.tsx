'use client';

import { Button } from '@/shared/components/button';
import Spacing from '@/shared/components/layout/Spacing';
import * as cs from '@/shared/styles/common.css';
import { vars } from '@/shared/styles/theme.css';
import { fetchApi } from '@/utils/fetchApi';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import RegisterInputBox from '../register/RegisterInputBox';
import * as s from '@/components/auth/register/RegisterStyle.css';
import { ResetPasswordFormData, resetPasswordSchema } from '@/utils/validation/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import useAlertContext from '@/hooks/useAlertContext';
import { useRouter } from 'next/navigation';
import AlertMainTextBox from '@/shared/components/alert/AlertMainTextBox';

const PasswordResetPersonalInfo = () => {
	const { open, close } = useAlertContext();
	const router = useRouter();
	const [authData, setAuthData] = useState<{ name: string; phone: string }>({
		name: '이종현',
		phone: '01048998811',
	});
	const [errorMessage, setErrorMessage] = useState('');
	const [isVerified, setIsVerified] = useState(true);

	const methods = useForm<ResetPasswordFormData>({
		resolver: zodResolver(resetPasswordSchema),
		mode: 'onChange',
	});

	const { setValue, handleSubmit } = methods;

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
					returnurl: 'http://pintoss2.cafe24.com//reset-password/nice',
				}),
			});

			const { token_version_id, enc_data, integrity_value } = requestData;

			if (!token_version_id || !enc_data || !integrity_value) {
				throw new Error('필수 데이터가 누락되었습니다.');
			}

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

	useEffect(() => {
		const messageHandler = (event: MessageEvent) => {
			if (event.origin !== window.location.origin) return;

			const { token_version_id, enc_data, integrity_value } = event.data;

			if (token_version_id && enc_data && integrity_value) {
				handleDecryption(token_version_id, enc_data, integrity_value);
			}
		};

		window.addEventListener('message', messageHandler);

		return () => {
			window.removeEventListener('message', messageHandler);
		};
	}, []);

	const handleDecryption = async (
		tokenVersionId: string,
		encData: string,
		integrityValue: string,
	) => {
		try {
			const decryptedData = await fetchApi('/api/niceid/decrypt', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					token_version_id: tokenVersionId,
					enc_data: encData,
					integrity_value: integrityValue,
				}),
			});

			console.log('decryptedData', decryptedData);

			setAuthData({ name: decryptedData.name, phone: decryptedData.mobileno });
			setValue('name', decryptedData.name);
			setValue('phone', decryptedData.mobileno);

			open({
				width: '300px',
				height: '200px',
				title: '휴대폰 인증 완료',
				main: <AlertMainTextBox text="휴대폰 인증이 완료되었습니다." />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: close,
			});
			setIsVerified(true);
		} catch (error) {
			console.error('Decryption error:', error);

			open({
				width: '300px',
				height: '200px',
				title: '휴대폰 인증 실패',
				main: (
					<AlertMainTextBox text="휴대폰 인증 처리 중 오류가 발생했습니다. 다시 시도해주세요." />
				),
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: close,
			});
		}
	};

	const handlePasswordReset = async (data: ResetPasswordFormData) => {
		try {
			await fetchApi('/api/auth/reset-password', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: authData.name,
					phone: authData.phone,
					newPassword: data.newPassword,
				}),
			});

			open({
				width: '300px',
				height: '200px',
				title: '비밀번호 재설정 완료',
				main: <AlertMainTextBox text="비밀번호가 성공적으로 변경되었습니다." />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: () => {
					close();
					router.push('/login');
				},
			});
		} catch (error) {
			console.error('Password reset error:', error);
			setErrorMessage('비밀번호 재설정 중 오류가 발생했습니다. 다시 시도해주세요.');
		}
	};

	return (
		<div style={{ marginBottom: '100px' }}>
			<FormProvider {...methods}>
				<div style={{ marginLeft: '10px' }}>
					<div style={{ width: '100%', textAlign: 'left' }}>
						<span className={s.baseText}>휴대폰인증</span>
						<span className={s.skyBlueText}>[필수]</span>
					</div>
					<Spacing margin="8px" />
					<div className={s.phoneInfoBox}>
						<p className={s.redText}>* 비밀번호 재설정을 위해 휴대폰 인증이 필요합니다.</p>
						<Spacing margin="5px" />
						<p className={s.smallText}>
							* 본인명의 휴대폰이 아닐 경우 비밀번호 재설정이 불가능합니다.
						</p>
						<Spacing margin="30px" />
						{errorMessage && <p className={s.redText}>{errorMessage}</p>}
						<Button
							color={vars.color.lightBlue}
							className={cs.whiteAndBlueButton}
							onClick={handleAuthClick}
							disabled={isVerified}>
							휴대폰 본인 인증하기
						</Button>
					</div>
					<Spacing margin="30px" />
					<RegisterInputBox
						name="name"
						label="이름"
						star
						placeholder="본인인증 후 자동입력됩니다."
					/>
					<Spacing margin="20px" />
					<RegisterInputBox
						name="phone"
						label="휴대폰"
						star
						placeholder="본인인증 후 자동입력됩니다."
					/>
					<Spacing margin="15px" />
					{isVerified && (
						<>
							<RegisterInputBox
								name="newPassword"
								label="새 비밀번호"
								star
								placeholder="새 비밀번호를 입력하세요."
								type="password"
							/>
							<Spacing margin="20px" />
							<RegisterInputBox
								name="confirmPassword"
								label="비밀번호 확인"
								star
								placeholder="비밀번호를 다시 입력하세요."
								type="password"
							/>
							<Spacing margin="40px" />
							<Button
								color={vars.color.lightBlue}
								className={cs.whiteAndBlueButton}
								onClick={handleSubmit(handlePasswordReset)}>
								비밀번호 재설정
							</Button>
						</>
					)}
				</div>
			</FormProvider>
		</div>
	);
};

export default PasswordResetPersonalInfo;
