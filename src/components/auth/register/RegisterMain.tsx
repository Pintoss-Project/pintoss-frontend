'use client';

import * as cs from '@/shared/styles/common.css';
import * as as from '@/components/auth/AuthStyle.css';
import { Divider } from '@/shared/components/layout';
import RegisterInfoBox from './RegisterInfoBox';
import { vars } from '@/shared/styles/theme.css';
import Spacing from '@/shared/components/layout/Spacing';
import RegisterAccountInfo from './RegisterAccountInfo';
import RegisterPersonalInfo from './RegisterPersonalInfo';
import RegisterAcceptTermsInfo from './RegisterAcceptTermsInfo';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { RegisterFormData, registerSchema } from '@/utils/validation/auth';
import { postRegister } from '@/app/api/auth/postRegister';
import useAlertContext from '@/hooks/useAlertContext';
import AlertMainTextBox from '@/shared/components/alert/AlertMainTextBox';
import { zodResolver } from '@hookform/resolvers/zod';
import RegisterButton from './RegisterButton';
import { getCheckIdResult } from '@/app/api/auth/checkDuplicateEmail';
import { useEffect, useState } from 'react';

const RegisterMain = () => {
	const { open, close } = useAlertContext();

	const methods = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
		mode: 'onChange',
		defaultValues: {
			termsOfUse: false,
			privacyPolicy: false,
			email: '',
			password: '',
			confirmPassword: '',
			name: '',
			phone: '',
		},
	});

	const { handleSubmit, watch } = methods;
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

	const onSubmit: SubmitHandler<RegisterFormData> = async (data, event) => {
		event?.preventDefault();

		if (!isEmailChecked) {
			const { data } = await getCheckIdResult(email);
			if (data) {
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

	useEffect(() => {
		setIsEmailChecked(false);
	}, [email]);

	return (
		<FormProvider {...methods}>
			<form id="register-form" onSubmit={handleSubmit(onSubmit)}>
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
