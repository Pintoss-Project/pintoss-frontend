'use client';

import { fetchAdminLogin } from '@/controllers/auth/fetchAdminLogin';
import useAlertContext from '@/hooks/useAlertContext';
import useRedirect from '@/hooks/useRedirect';
import authState from '@/recoil/authAtom';
import AlertMainTextBox from '@/shared/components/alert/AlertMainTextBox';
import { Button } from '@/shared/components/button';
import LoginInput from '@/shared/components/input/LoginInput';
import { Flex } from '@/shared/components/layout';
import Spacing from '@/shared/components/layout/Spacing';
import * as cs from '@/shared/styles/common.css';
import { vars } from '@/shared/styles/theme.css';
import LoginError from '@/utils/error/LoginError';
import { setLocalToken, tokenExpiration } from '@/utils/localToken';
import { LogInFormData, loginSchema } from '@/utils/validation/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import * as s from './AdminStyle.css';

const AdminLoginSection = () => {
	const { open, close } = useAlertContext();
	const { setRedirectPath } = useRedirect();
	const setAuthStateValue = useSetRecoilState(authState);

	const methods = useForm<LogInFormData>({
		resolver: zodResolver(loginSchema),
		mode: 'onChange',
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const { handleSubmit } = methods;

	const mutation = useMutation({
		mutationFn: fetchAdminLogin,
		onSuccess: (data) => {
			setLocalToken(data.data.accessToken);

			open({
				width: '300px',
				height: '200px',
				title: '로그인',
				main: <AlertMainTextBox text="로그인에 성공했습니다." />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: () => {
					setRedirectPath('/admin/manage/users');
					tokenExpiration();
					setAuthStateValue((prev) => ({ ...prev, isAdminLoggedIn: true }));
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
