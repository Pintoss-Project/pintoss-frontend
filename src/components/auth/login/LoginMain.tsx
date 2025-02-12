'use client';

import { fetchLogin } from '@/controllers/auth/fetchLogin';
import * as as from '@/components/auth/AuthStyle.css';
import useAlertContext from '@/hooks/useAlertContext';
import authState from '@/recoil/authAtom';
import AlertMainTextBox from '@/shared/components/alert/AlertMainTextBox';
import { Flex } from '@/shared/components/layout';
import Spacing from '@/shared/components/layout/Spacing';
import * as cs from '@/shared/styles/common.css';
import { setLocalToken, tokenExpiration } from '@/utils/localToken';
import { LogInFormData, loginSchema } from '@/utils/validation/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import LoginButtons from './LoginButtons';
import LoginInputBox from './LoginInputBox';
import * as s from './LoginStyle.css';
import { vars } from '@/shared/styles/theme.css';

interface ApiError {
	message: string;
}

const LoginMain = () => {
	const { open, close } = useAlertContext();
	const router = useRouter();

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
		mutationFn: (data: LogInFormData) => fetchLogin(data),
		onSuccess: (data) => {
			if (data && data.data) {
				const { accessToken } = data.data;

				open({
					width: '300px',
					height: '200px',
					title: '로그인',
					main: <AlertMainTextBox text="로그인이 완료되었습니다." />,
					rightButtonStyle: cs.lightBlueButton,
					onRightButtonClick: () => {
						setLocalToken(accessToken);
						tokenExpiration();
						setAuthStateValue((prev) => ({ ...prev, isLoggedIn: true }));
						router.push('/');
						close();
					},
				});
			} else {
				open({
					width: '300px',
					height: '200px',
					title: '로그인 실패',
					main: <AlertMainTextBox text="로그인에 실패했습니다. 다시 시도해주세요." />,
					rightButtonStyle: cs.lightBlueButton,
					onRightButtonClick: close,
				});
			}
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
