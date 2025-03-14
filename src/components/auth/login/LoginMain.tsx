'use client';

import { useAuth } from '@/contexts/AuthContext';
import { fetchLogin } from '@/controllers/auth/fetchLogin';
import * as as from '@/components/auth/AuthStyle.css';
import useAlertContext from '@/hooks/useAlertContext';
import AlertMainTextBox from '@/shared/components/alert/AlertMainTextBox';
import { Flex } from '@/shared/components/layout';
import Spacing from '@/shared/components/layout/Spacing';
import * as cs from '@/shared/styles/common.css';
import { LogInFormData, loginSchema } from '@/utils/validation/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import LoginButtons from './LoginButtons';
import LoginInputBox from './LoginInputBox';
import * as s from './LoginStyle.css';
import { vars } from '@/shared/styles/theme.css';

interface ApiError {
	message: string;
}

const LoginMain = () => {
	const { login } = useAuth();
	const { open, close } = useAlertContext();
	const router = useRouter();

	const methods = useForm<LogInFormData>({
		resolver: zodResolver(loginSchema),
		mode: 'onChange',
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const { handleSubmit } = methods;

	const loginMutation = useMutation({
		mutationFn: fetchLogin,
		onSuccess: async (response) => {
			const { data: { accessToken }, code, message, status } = response;
			console.log("fetchLogin", response);
			await login(accessToken);
			router.push('/');
		},
		onError: (error: ApiError) => {
			open({
				width: '300px',
				height: '200px',
				title: '로그인',
				main: <AlertMainTextBox text={error.message} />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: close,
			});
		},
	});

	const onSubmit: SubmitHandler<LogInFormData> = (data, event) => {
		event?.preventDefault();

		try {
			loginMutation.mutate(data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<FormProvider {...methods}>
			<form id="login-form" className={s.loginMainContainer} onSubmit={handleSubmit(onSubmit)}>
				<Spacing margin="18px" />
				<Flex direction="column">
					<LoginInputBox name="email" type="text" placeholder="아이디(이메일)" />
					<Spacing margin="10px" />
					<LoginInputBox name="password" type="password" placeholder="비밀번호를 입력해주세요" />
					<Spacing margin="18px" />
				</Flex>
				<Flex justify="flex-end" align="center">
					<Link href="/find-id" className={s.grayText}>
						아이디 찾기
					</Link>
					<div style={{ width: '20px', color: vars.color.lightGray }}>|</div>
					<Link href="/reset-password" className={s.grayText}>
						비밀번호 재설정
					</Link>
					<Link href="/register" className={s.blueText}>
						회원가입
					</Link>
				</Flex>
				<Spacing margin="17px" />
				<footer className={as.footerWrap}>
					<LoginButtons />
				</footer>
				<Spacing margin="165px" />
			</form>
		</FormProvider>
	);
};

export default LoginMain;
