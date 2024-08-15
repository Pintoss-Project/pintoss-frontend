'use client';

import authState from '@/recoil/authAtom';
import * as s from './NavBarStyle.css';

import useRedirect from '@/hooks/useRedirect';
import { Flex, List } from '@/shared/components/layout';
import { removeLocalToken } from '@/utils/localToken';
import Link from 'next/link';
import { useRecoilState } from 'recoil';

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
	const { setRedirectPath } = useRedirect();

	const handleLogout = () => {
		setAuthStateValue({ isLoggedIn: false });
		removeLocalToken();
		setRedirectPath('/');
	};

	return (
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
	);
};

export default NavBarTopMenuBox;
