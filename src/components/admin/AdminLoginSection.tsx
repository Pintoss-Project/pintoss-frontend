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

const AdminLoginSection = () => {
	const { open, close } = useAlertContext();

	const methods = useForm<LogInFormData>({
		resolver: zodResolver(loginSchema),
		mode: 'onChange',
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const { handleSubmit } = methods;

	const onSubmit: SubmitHandler<LogInFormData> = async (data, event) => {
		event?.preventDefault();

		const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		});

		if (response.ok) {
			const { data } = await response.json();

			setLocalToken(data.accessToken);

			open({
				width: '300px',
				height: '200px',
				title: '로그인',
				main: <AlertMainTextBox text="로그인에 성공했습니다." />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: () => {
					close();
				},
				onBackDropClick: () => {
					close();
				},
			});
		} else {
			await response.json();
			const errorStatus = response.status;

			if (errorStatus === 401) {
				open({
					width: '300px',
					height: '200px',
					title: '로그인 실패',
					main: <AlertMainTextBox text="관리자만 로그인 가능합니다." />,
					rightButtonStyle: cs.lightBlueButton,
					onRightButtonClick: () => {
						close();
					},
					onBackDropClick: () => {
						close();
					},
				});
			}
		}
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
