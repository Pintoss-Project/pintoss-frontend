'use client';

import authState from '@/recoil/authAtom';
import * as cs from '@/shared/styles/common.css';
import * as s from './NavBarStyle.css';

import { fetchLogout } from '@/app/api/auth/fetchLogout';
import useAlertContext from '@/hooks/useAlertContext';
import AlertMainTextBox from '@/shared/components/alert/AlertMainTextBox';
import { Flex, List } from '@/shared/components/layout';
import { getLocalToken, removeLocalToken } from '@/utils/localToken';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import ProtectedRoute from '../protect/ProtectedRoute';

const NAV_BAR_TOP_MENU = [
	{ name: '고객센터', url: '/customer-service' },
	{ name: '회원가입', url: '/register' },
];

const NAV_BAR_LOGIN_TOP_MENU = [
	{ name: '주문조회', url: '/order/list' },
	{ name: '마이페이지', url: '/my-page' },
	{ name: '고객센터', url: '/customer-service' },
];

const NavBarTopMenuBox = () => {
	const [authStateValue, setAuthStateValue] = useRecoilState(authState);
	const router = useRouter();

	const { open, close } = useAlertContext();

	const logoutMutation = useMutation({
		mutationFn: () => fetchLogout(),
		onSuccess: () => {
			setAuthStateValue((prev) => ({ ...prev, isLoggedIn: false }));
			open({
				width: '300px',
				height: '200px',
				title: '로그아웃',
				main: <AlertMainTextBox text="로그아웃이 완료되었습니다." />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: () => {
					removeLocalToken();
					close();
				},
			});
		},
		onError: () => {
			open({
				width: '300px',
				height: '200px',
				title: '로그아웃',
				main: <AlertMainTextBox text="로그아웃에 실패했습니다." />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: close,
			});
		},
	});

	const handleLogout = () => {
		logoutMutation.mutate();
		router.push('/');
	};

	useEffect(() => {
		const token = getLocalToken();

		if (!token) {
			setAuthStateValue((prev) => ({ ...prev, isLoggedIn: false }));
		} else {
			setAuthStateValue((prev) => ({ ...prev, isLoggedIn: true }));
		}
	}, []);

	return (
		<ProtectedRoute>
			<div className={s.navbarTopMenuBox}>
				<List spacing={3} variant="unordered">
					<Flex align="center">
						{(authStateValue.isLoggedIn === true ? NAV_BAR_LOGIN_TOP_MENU : NAV_BAR_TOP_MENU).map(
							(menu) => (
								<Link href={menu.url} key={menu.name}>
									<li className={s.listItemStyle}>{menu.name}</li>
								</Link>
							),
						)}
						{authStateValue.isLoggedIn === false && (
							<Link href="/login">
								<div className={s.loginButton}>로그인</div>
							</Link>
						)}
						{authStateValue.isLoggedIn === true && (
							<div className={s.listItemStyle} onClick={handleLogout}>
								로그아웃
							</div>
						)}
						{authStateValue.isLoggedIn === true && (
							<Link href="/order/cart">
								<img
									src="/images/cart-icon.png"
									alt="장바구니 아이콘"
									className={s.cartDesktopIcon}
								/>
							</Link>
						)}
					</Flex>
				</List>
			</div>
		</ProtectedRoute>
	);
};

export default NavBarTopMenuBox;
