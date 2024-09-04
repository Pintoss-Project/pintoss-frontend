'use client';

import { getCheckIdResult } from '@/app/api/auth/checkDuplicateEmail';
import { postRegister } from '@/app/api/auth/postRegister';
import { updateUserInfo } from '@/app/api/user/updateUserInfo';
import * as as from '@/components/auth/AuthStyle.css';
import useAlertContext from '@/hooks/useAlertContext';
import useRedirect from '@/hooks/useRedirect';
import authState from '@/recoil/authAtom';
import AlertMainTextBox from '@/shared/components/alert/AlertMainTextBox';
import { Divider } from '@/shared/components/layout';
import Spacing from '@/shared/components/layout/Spacing';
import * as cs from '@/shared/styles/common.css';
import { vars } from '@/shared/styles/theme.css';
import { setLocalToken } from '@/utils/localToken';
import {
	OAuthRegisterFormData,
	oAuthRegisterSchema,
	RegisterFormData,
	registerSchema,
} from '@/utils/validation/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import RegisterAcceptTermsInfo from './RegisterAcceptTermsInfo';
import RegisterAccountInfo from './RegisterAccountInfo';
import RegisterButton from './RegisterButton';
import RegisterInfoBox from './RegisterInfoBox';
import RegisterPersonalInfo from './RegisterPersonalInfo';
import { fetchApi } from '@/utils/fetchApi';

interface Props {
	oAuthEmail?: string;
	accessToken?: string;
}

const RegisterMain = ({ oAuthEmail, accessToken }: Props) => {
	const { open, close } = useAlertContext();
	const { setRedirectPath } = useRedirect();
	const setAuthState = useSetRecoilState(authState);
	const router = useRouter();

	const searchParam = useSearchParams();
	const [isOAuth, setIsOAuth] = useState(false);

	const [authData, setAuthData] = useState<{ name?: string; phone?: string }>({});

	useEffect(() => {
		const oauthParam = searchParam.get('oauth');
		setIsOAuth(oauthParam === 'true');
	}, [searchParam]);

	useEffect(() => {
		if (accessToken) {
			setLocalToken(accessToken);
		}
	}, [accessToken]);

	const chosenSchema = isOAuth ? oAuthRegisterSchema : registerSchema;

	const methods = useForm<RegisterFormData | OAuthRegisterFormData>({
		resolver: zodResolver(chosenSchema),
		mode: 'onChange',
		defaultValues: {
			termsOfUse: false,
			privacyPolicy: false,
			email: oAuthEmail || '',
			password: '',
			confirmPassword: '',
			name: authData.name || '',
			phone: authData.phone || '',
			inflow: '',
		},
	});

	const { watch, handleSubmit, setValue, trigger } = methods;
	const email = watch('email');
	const [isEmailChecked, setIsEmailChecked] = useState(false);

	useEffect(() => {
		setIsEmailChecked(false);
	}, [email]);

	useEffect(() => {
		if (oAuthEmail) {
			setValue('email', oAuthEmail as string);
		}
	}, [oAuthEmail, setValue]);

	const registerMutation = useMutation({
		mutationFn: (data: RegisterFormData) => postRegister(data),
		onSuccess: () => {
			open({
				width: '300px',
				height: '200px',
				title: '회원가입',
				main: <AlertMainTextBox text="회원가입이 완료되었습니다." />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: close,
			});
		},
		onError: () => {
			open({
				width: '300px',
				height: '200px',
				title: '회원가입',
				main: <AlertMainTextBox text="회원가입이 실패되었습니다." />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: close,
			});
		},
	});

	const oAuthRegisterMutation = useMutation({
		mutationFn: (data: OAuthRegisterFormData) => updateUserInfo(data),
		onSuccess: () => {
			open({
				width: '300px',
				height: '200px',
				title: '회원정보 수정',
				main: <AlertMainTextBox text="회원가입이 완료되었습니다." />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: close,
			});
			router.push('/');
			setAuthState((prev) => ({ ...prev, isLoggedIn: true }));
		},
		onError: () => {
			open({
				width: '300px',
				height: '200px',
				title: '회원정보 수정',
				main: <AlertMainTextBox text="알 수 없는 에러가 발생했습니다." />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: close,
			});
		},
	});

	const handleRegisterSubmit: SubmitHandler<RegisterFormData> = async (data, event) => {
		event?.preventDefault();

		if (!isEmailChecked) {
			const { data: checkData } = await getCheckIdResult(email);
			if (checkData) {
				open({
					width: '300px',
					height: '200px',
					title: '회원가입 오류',
					main: <AlertMainTextBox text="이미 등록된 이메일입니다." />,
					rightButtonStyle: cs.lightBlueButton,
					onRightButtonClick: close,
				});
				setIsEmailChecked(true);
				return;
			}
		}

		const isValid = await trigger(['name', 'phone']);
		console.log('Validation after setValue:', isValid);

		registerMutation.mutate(data);
	};

	const handleOAuthRegisterSubmit: SubmitHandler<OAuthRegisterFormData> = (data, event) => {
		event?.preventDefault();
		if (data?.email === oAuthEmail) {
			oAuthRegisterMutation.mutate(data);
		}
	};

	const handleFormSubmit = isOAuth
		? handleSubmit(
				handleOAuthRegisterSubmit as SubmitHandler<RegisterFormData | OAuthRegisterFormData>,
		  )
		: handleSubmit(handleRegisterSubmit as SubmitHandler<RegisterFormData | OAuthRegisterFormData>);

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

			// 인증 완료 후 리다이렉트
			router.push('/register'); // 원하는 경로로 리다이렉트
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

	return (
		<FormProvider {...methods}>
			<form id="register-form" onSubmit={handleFormSubmit}>
				<Spacing margin="73px" />
				<RegisterInfoBox subTitle="약관동의" info={<RegisterAcceptTermsInfo />} />
				<Divider color={vars.color.lighterGray} size={1} />
				<Spacing margin="40px" />
				<RegisterInfoBox subTitle="계정정보" info={<RegisterAccountInfo />} />
				<Divider color={vars.color.lighterGray} size={1} />
				<Spacing margin="40px" />
				<RegisterInfoBox
					subTitle="회원 개인정보"
					info={<RegisterPersonalInfo authData={authData} />}
				/>
				<Spacing margin="40px" />
				<footer className={as.footerWrap}>
					<RegisterButton />
				</footer>
			</form>
			<Spacing margin="165px" />
		</FormProvider>
	);
};

export default RegisterMain;
