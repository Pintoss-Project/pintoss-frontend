'use client';

import { fetchCheckId } from '@/controllers/auth/fetchCheckId';
import { fetchCheckPhone } from '@/controllers/auth/fetchCheckPhone';
import { fetchRegister } from '@/controllers/auth/fetchRegister';
import { fetchDecryptedData } from '@/controllers/niceid/fetchDecryptedData';
import { fetchUpdateUserInfo } from '@/controllers/user/fetchUpdateUserInfo';
import * as as from '@/components/auth/AuthStyle.css';
import useAlertContext from '@/hooks/useAlertContext';
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
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import RegisterAcceptTermsInfo from './RegisterAcceptTermsInfo';
import RegisterAccountInfo from './RegisterAccountInfo';
import RegisterButton from './RegisterButton';
import RegisterInfoBox from './RegisterInfoBox';
import RegisterPersonalInfo from './RegisterPersonalInfo';
import { useAuth } from '@/contexts/AuthContext';

interface Props {
	oAuthEmail?: string;
	accessToken?: string;
	loginType?: 'LOCAL' | 'KAKAO' | 'NAVER';
}

const RegisterMain = ({ oAuthEmail, loginType, accessToken }: Props) => {
	const { open, close } = useAlertContext();
	const router = useRouter();
	// const { isAuthenticated, login } = useAuth();

	const searchParam = useSearchParams();
	const [isOAuth, setIsOAuth] = useState(false);

	const [authData, setAuthData] = useState<{ name?: string; phone?: string }>({});
	const [isPhoneDuplicate, setIsPhoneDuplicate] = useState(false);

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
			loginType: loginType ? loginType : 'LOCAL',
		},
	});

	const { watch, handleSubmit, setValue } = methods;
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
		mutationFn: (data: RegisterFormData) => {
			let _phone = data.phone;
			// turn 01012345678 into 010-1234-5678
			if (_phone.length === 11) _phone = _phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
			return fetchRegister({
				...data,
				phone: _phone,
			});
		},
		onSuccess: () => {
			open({
				width: '300px',
				height: '200px',
				title: '회원가입',
				main: <AlertMainTextBox text="회원가입이 완료되었습니다." />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: close,
			});
			router.push('/login');
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
		mutationFn: (data: OAuthRegisterFormData) => fetchUpdateUserInfo(data),
		onSuccess: () => {
			open({
				width: '300px',
				height: '200px',
				title: '회원정보 수정',
				main: <AlertMainTextBox text="회원가입이 완료되었습니다." />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: close,
			});
			router.push('/login');
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

		console.log('handleRegisterSubmit data', data);

		if (!isEmailChecked) {
			try {
				const { data: checkData } = await fetchCheckId(email);
				console.log('checkData', checkData);
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
			} catch (error) {
				console.error('handleRegisterSubmit error', error);
				open({
					width: '300px',
					height: '200px',
					title: '회원가입 오류',
					main: <AlertMainTextBox text="가입 가능여부 확인을 실패했습니다." />,
					rightButtonStyle: cs.lightBlueButton,
					onRightButtonClick: close,
				});
			}
		}

		registerMutation.mutate(data);
	};

	const handleOAuthRegisterSubmit: SubmitHandler<OAuthRegisterFormData> = (data, event) => {
		event?.preventDefault();
		if (data?.email === oAuthEmail) {
			oAuthRegisterMutation.mutate(data);
		}
	};

	const handleFormSubmit = useCallback((e: any) => {
		e.preventDefault();
		console.log('handleFormSubmit', "isOAuth", isOAuth);
		if (isOAuth) {
			handleSubmit(
				handleOAuthRegisterSubmit as SubmitHandler<RegisterFormData | OAuthRegisterFormData>,
			)(e);
		} else {
			handleSubmit(handleRegisterSubmit as SubmitHandler<RegisterFormData | OAuthRegisterFormData>, (e) => {
				console.log('handleSubmit error', e);
				if (e.phone) {
					open({
						width: '300px',
						height: '200px',
						title: '휴대폰 인증을 완료해 주세요',
						main: <AlertMainTextBox text="휴대폰 인증을 완료해 주세요." />,
						rightButtonStyle: cs.lightBlueButton,
						onRightButtonClick: close,
					});
				}
			})(e);
		}
	}, [isOAuth, methods]);

	useEffect(() => {
		const messageHandler = (event: MessageEvent) => {
			if (event.origin !== window.location.origin) return;
			try {
				// const { tokenVersionId, encData, integrityValue } = JSON.parse(event.data);
				// if (tokenVersionId && encData && integrityValue) {
				// 	handleDecryption(tokenVersionId, encData, integrityValue);
				// }

				const { name, tel } = JSON.parse(event.data);
				if (name && tel) {
					setAuthData({ name, phone: tel });
					setValue('name', name);
					setValue('phone', tel);

					checkPhone(tel);
				}
			} catch (error) {
				console.error('Decryption error:', error);
			}
		};

		window.addEventListener('message', messageHandler);

		return () => {
			window.removeEventListener('message', messageHandler);
		};
	}, []);

	const checkPhone = async (phone: string) => {
		const phoneCheckResult = await fetchCheckPhone(phone);

		if (phoneCheckResult.data) {
			setIsPhoneDuplicate(true);
			open({
				width: '300px',
				height: '200px',
				title: '휴대폰 중복 오류',
				main: (
					<AlertMainTextBox text="이미 등록된 휴대폰 번호입니다. 다른 번호를 사용해 주세요." />
				),
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: close,
			});
		} else {
			setIsPhoneDuplicate(false);
			open({
				width: '300px',
				height: '200px',
				title: '휴대폰 인증 완료',
				main: <AlertMainTextBox text="휴대폰 인증이 완료되었습니다." />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: close,
			});
		}
	}

	return (
		<FormProvider {...methods}>
			<form id="register-form" onSubmit={handleFormSubmit}>
				<Spacing margin="73px" />
				<RegisterInfoBox subTitle="약관동의" info={<RegisterAcceptTermsInfo />} />
				<Divider color={vars.color.lighterGray} size={1} />
				<Spacing margin="40px" />
				<RegisterInfoBox subTitle="계정정보" info={<RegisterAccountInfo isOAuth={!!oAuthEmail} />} />
				<Divider color={vars.color.lighterGray} size={1} />
				<Spacing margin="40px" />
				<RegisterInfoBox
					subTitle="회원 개인정보"
					info={<RegisterPersonalInfo authData={authData} />}
				/>
				<Spacing margin="40px" />
				<footer className={as.footerWrap}>
					<RegisterButton disabled={isPhoneDuplicate} />
				</footer>
			</form>
			<Spacing margin="165px" />
		</FormProvider>
	);
};

export default RegisterMain;
