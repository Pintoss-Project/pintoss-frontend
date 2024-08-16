'use client';

import { getCheckIdResult } from '@/app/api/auth/checkDuplicateEmail';
import { postRegister } from '@/app/api/auth/postRegister';
import * as as from '@/components/auth/AuthStyle.css';
import useAlertContext from '@/hooks/useAlertContext';
import AlertMainTextBox from '@/shared/components/alert/AlertMainTextBox';
import { Divider } from '@/shared/components/layout';
import Spacing from '@/shared/components/layout/Spacing';
import * as cs from '@/shared/styles/common.css';
import { vars } from '@/shared/styles/theme.css';
import {
	OAuthRegisterFormData,
	oAuthRegisterSchema,
	RegisterFormData,
	registerSchema,
} from '@/utils/validation/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import RegisterAcceptTermsInfo from './RegisterAcceptTermsInfo';
import RegisterAccountInfo from './RegisterAccountInfo';
import RegisterButton from './RegisterButton';
import RegisterInfoBox from './RegisterInfoBox';
import RegisterPersonalInfo from './RegisterPersonalInfo';
import { useSearchParams } from 'next/navigation';
import { updateUserInfo } from '@/app/api/user/updateUserInfo';
import { setLocalToken } from '@/utils/localToken';

interface Props {
	oAuthName?: string;
	oAUthEmail?: string;
	accessToken?: string;
}

const RegisterMain = ({ oAuthName, oAUthEmail, accessToken }: Props) => {
	const { open, close } = useAlertContext();

	const searchParam = useSearchParams();
	const [isOAuth, setIsOAuth] = useState(false);

	useEffect(() => {
		const oauthParam = searchParam.get('oauth');
		if (oauthParam === 'true') {
			setIsOAuth(true);
		} else {
			setIsOAuth(false);
		}
	}, [searchParam]);

	useEffect(() => {
		setLocalToken(accessToken as string);
	}, [accessToken]);

	const chosenSchema = isOAuth ? oAuthRegisterSchema : registerSchema;

	const methods = useForm<RegisterFormData | OAuthRegisterFormData>({
		resolver: zodResolver(chosenSchema),
		mode: 'onChange',
		defaultValues: {
			termsOfUse: false,
			privacyPolicy: false,
			email: '',
			password: '',
			confirmPassword: '',
			name: '',
			phone: '',
			inflow: '',
		},
	});

	const { watch, setValue, handleSubmit } = methods;
	const email = watch('email');
	const [isEmailChecked, setIsEmailChecked] = useState(false);

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

		registerMutation.mutate(data);
	};

	const handleOAuthRegisterSubmit: SubmitHandler<OAuthRegisterFormData> = (data, event) => {
		event?.preventDefault();
		if (data?.email === oAUthEmail) {
			oAuthRegisterMutation.mutate(data);
		}
	};

	const handleFormSubmit = isOAuth
		? handleSubmit(
				handleOAuthRegisterSubmit as SubmitHandler<RegisterFormData | OAuthRegisterFormData>,
		  )
		: handleSubmit(handleRegisterSubmit as SubmitHandler<RegisterFormData | OAuthRegisterFormData>);

	useEffect(() => {
		setIsEmailChecked(false);
	}, [email]);

	useEffect(() => {
		if (oAUthEmail) {
			methods.setValue('email', oAUthEmail as string);
		}
		if (oAuthName) {
			methods.setValue('name', oAuthName as string);
		}
	}, [oAUthEmail, oAuthName]);

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
				<RegisterInfoBox subTitle="회원 개인정보" info={<RegisterPersonalInfo />} />
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
