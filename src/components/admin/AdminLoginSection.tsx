'use client';

import * as s from './AdminStyle.css';
import * as cs from '@/shared/styles/common.css';
import { Flex } from '@/shared/components/layout';
import Spacing from '@/shared/components/layout/Spacing';
import { Button } from '@/shared/components/button';
import { vars } from '@/shared/styles/theme.css';
import useAlertContext from '@/hooks/useAlertContext';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LogInFormData, loginSchema } from '@/utils/validation/auth';
import AlertMainTextBox from '@/shared/components/alert/AlertMainTextBox';
import LoginInput from '@/shared/components/input/LoginInput';
import { setLocalToken } from '@/utils/localToken';
import useRedirect from '@/hooks/useRedirect';
import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { fetchAdminLogin } from '@/app/api/auth/fetchAdminLogin';
import LoginError from '@/utils/error/LoginError';

const AdminLoginSection = () => {
	const { open, close } = useAlertContext();
	const { setRedirectPath } = useRedirect();

	const methods = useForm<LogInFormData>({
		resolver: zodResolver(loginSchema),
		mode: 'onChange',
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const {
		handleSubmit,
		formState: { errors },
	} = methods;

	const emailErrorMessage = errors.email?.message as string;

	const mutation = useMutation({
		mutationFn: fetchAdminLogin,
		onSuccess: (data) => {
			setLocalToken(data.accessToken);

			open({
				width: '300px',
				height: '200px',
				title: '로그인',
				main: <AlertMainTextBox text="로그인에 성공했습니다." />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: () => {
					setRedirectPath('/admin/manage/users');
					close();
				},
			});
		},
		onError: (error: Error) => {
			if (error instanceof LoginError) {
				open({
					width: '300px',
					height: '200px',
					title: '로그인 실패',
					main: <AlertMainTextBox text={error.errorMessage} />,
					rightButtonStyle: cs.lightBlueButton,
					onRightButtonClick: () => {
						close();
					},
					onBackDropClick: () => {
						close();
					},
				});
			}
		},
	});

	const onSubmit: SubmitHandler<LogInFormData> = (data, event) => {
		event?.preventDefault();
		mutation.mutate(data);
	};

	useEffect(() => {
		if (errors.email) {
			open({
				width: '300px',
				height: '200px',
				title: '유효성 검사 오류',
				main: <AlertMainTextBox text={emailErrorMessage} />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: () => {
					close();
				},
				onBackDropClick: () => {
					close();
				},
			});
		}
	}, [errors]);

	return (
		<Flex direction="column" justify="center" align="center" className={s.adminLoginContainer}>
			<FormProvider {...methods}>
				<form
					id="admin-login-form"
					className={s.adminLoginFlexWrap}
					onSubmit={handleSubmit(onSubmit)}>
					<h1 style={{ fontSize: '30px', fontWeight: 'bold' }}>로그인</h1>
					<Spacing margin="40px" />
					<LoginInput name="email" type="text" placeholder="이메일을 입력하세요" />
					<Spacing margin="10px" />
					<LoginInput name="password" type="password" placeholder="비밀번호를 입력해주세요" />
					<Spacing margin="18px" />
					<Button
						form="admin-login-form"
						color={vars.color.white}
						className={s.adminLoginButton}
						style={{ cursor: 'pointer' }}
						type="submit">
						로그인
					</Button>
				</form>
			</FormProvider>
		</Flex>
	);
};

export default AdminLoginSection;
