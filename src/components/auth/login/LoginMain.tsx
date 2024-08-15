'use client';

import * as s from './LoginStyle.css';
import * as cs from '@/shared/styles/common.css';
import * as as from '@/components/auth/AuthStyle.css';
import { Input } from '@/shared/components/input';
import { Flex } from '@/shared/components/layout';
import Spacing from '@/shared/components/layout/Spacing';
import Link from 'next/link';
import LoginButtons from './LoginButtons';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { LogInFormData, loginSchema } from '@/utils/validation/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import useAlertContext from '@/hooks/useAlertContext';
import { useMutation } from '@tanstack/react-query';
import { postLogin } from '@/app/api/auth/postLogin';
import AlertMainTextBox from '@/shared/components/alert/AlertMainTextBox';
import LoginInputBox from './LoginInputBox';
import useRedirect from '@/hooks/useRedirect';
import { setLocalToken } from '@/utils/localToken';
import { useSetRecoilState } from 'recoil';
import authState from '@/recoil/authAtom';

const LoginMain = () => {
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

	const loginMutation = useMutation({
		mutationFn: (data: LogInFormData) => postLogin(data),
		onSuccess: (data) => {
			const { accessToken } = data?.data;

			open({
				width: '300px',
				height: '200px',
				title: '로그인',
				main: <AlertMainTextBox text="로그인이 완료되었습니다." />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: () => {
					setLocalToken(accessToken);
					setAuthStateValue({ isLoggedIn: true });
					setRedirectPath('/');
					close();
				},
			});
		},
		onError: async (error) => {
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
					<Link href="" className={s.grayText}>
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
