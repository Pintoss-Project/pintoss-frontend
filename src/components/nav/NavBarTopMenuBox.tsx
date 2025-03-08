import * as cs from '@/shared/styles/common.css';
import * as s from './NavBarStyle.css';

import { fetchLogout } from '@/controllers/auth/fetchLogout';
import useAlertContext from '@/hooks/useAlertContext';
import AlertMainTextBox from '@/shared/components/alert/AlertMainTextBox';
import { Flex, List } from '@/shared/components/layout';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/protect/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';

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
	const { isAuthenticated, logout } = useAuth();
	const router = useRouter();
	const { open, close } = useAlertContext();

	const logoutMutation = useMutation({
		mutationFn: async () => {
			try {
				await fetchLogout();
			} catch (error) {
				console.log('logout error:', error);
			}
			return null;
		},
		onSuccess: async () => {
			await logout();
			open({
				width: '300px',
				height: '200px',
				title: '로그아웃',
				main: <AlertMainTextBox text="로그아웃이 완료되었습니다." />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: close,
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

	return (
		<ProtectedRoute>
			<div className={s.navbarTopMenuBox}>
				<List spacing={3} variant="unordered">
					<Flex align="center">
						{(isAuthenticated ? NAV_BAR_LOGIN_TOP_MENU : NAV_BAR_TOP_MENU).map(
							(menu) => (
								<Link href={menu.url} key={menu.name}>
									<li className={s.listItemStyle}>{menu.name}</li>
								</Link>
							),
						)}
						{!isAuthenticated && (
							<Link href="/login">
								<div className={s.loginButton}>로그인</div>
							</Link>
						)}
						{isAuthenticated && (
							<div className={s.listItemStyle} onClick={handleLogout}>
								로그아웃
							</div>
						)}
						{/* {isAuthenticated && (
							<Link href="/order/cart">
								<img
									src="/images/cart-icon.png"
									alt="장바구니 아이콘"
									className={s.cartDesktopIcon}
								/>
							</Link>
						)} */}
					</Flex>
				</List>
			</div>
		</ProtectedRoute>
	);
};

export default NavBarTopMenuBox;
