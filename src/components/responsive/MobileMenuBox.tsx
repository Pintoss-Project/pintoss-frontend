import useRedirect from '@/hooks/useRedirect';
import { Button } from '@/shared/components/button';
import { Flex } from '@/shared/components/layout';
import { vars } from '@/shared/styles/theme.css';
import { removeLocalToken } from '@/utils/localToken';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { PintossColorLogo } from '../../../public/svgs';
import MobileProducts from './MobileProducts';
import * as s from './ResponsiveStyle.css';
import { useAuth } from '@/contexts/AuthContext';

interface Props {
	setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MENU_BUTTONS = {
	login: [
		{ label: '마이페이지', url: '/my-page' },
		{ label: '주문조회', url: '/order/list' },
		{ label: '고객센터', url: '/customer-service' },
	],
	logout: [
		{ label: '고객센터', url: '/customer-service' },
		{ label: '회원가입', url: '/register' },
		{ label: '로그인', url: '/login' },
	],
};

const MobileMenuBox = ({ setIsMenuOpen }: Props) => {
	const { setRedirectPath } = useRedirect();
	const router = useRouter();

	const {isAuthenticated, logout } = useAuth();

	const handleClose = () => {
		setIsMenuOpen(false);
	};

	const handleLogout = () => {
		logout();
		removeLocalToken();
		setRedirectPath('/');
		setIsMenuOpen(false);
	};

	const handleLinkClick = (url: string) => {
		setIsMenuOpen(false);
		router.push(url);
	};

	const menuButtons = isAuthenticated ? MENU_BUTTONS.login : MENU_BUTTONS.logout;

	useEffect(() => {
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = 'auto';
		};
	}, []);

	return (
		<div
			style={{
				position: 'fixed',
				left: '0',
				top: '0',
				width: '100%',
				height: '100%',
				minHeight: '340px',
				backgroundColor: vars.color.white,
				zIndex: 20,
				overflowY: 'auto',
			}}>
			<div>
				<Flex justify="space-between" align="center" className={s.tableMenuNavBox}>
					{/* {isAuthenticated && (
						<Link href="/order/cart">
							<img src="/images/cart-icon.png" alt="장바구니 아이콘" className={s.cartIcon} />
						</Link>
					)} */}
					<Link href="/" className={s.logoBox} onClick={() => setIsMenuOpen(false)}>
						<div className={s.logoBox}>
							<Image
								src={PintossColorLogo}
								alt="로고 이미지"
								fill
								style={{ objectFit: 'contain' }}
							/>
						</div>
					</Link>
					<IoClose
						onClick={handleClose}
						style={{ width: '40px', height: '40px', cursor: 'pointer' }}
					/>
				</Flex>
			</div>
			<MobileProducts setIsMenuOpen={setIsMenuOpen} />
			<div style={{ border: `1px solid ${vars.color.paleGray}` }}>
				<Flex direction="column" align="center">
					{menuButtons.map((button, index) => (
						<Flex key={button.label} justify="center" align="center" className={s.menuButtonBox}>
							<Button
								key={index}
								onClick={() => handleLinkClick(button.url)}
								color={vars.color.black}
								className={s.menuButton}>
								{button.label}
							</Button>
						</Flex>
					))}
					{isAuthenticated && (
						<Flex justify="center" align="center" className={s.menuButtonBox}>
							<Button
								onClick={handleLogout}
								color={vars.color.black}
								style={{ color: vars.color.softRed }}
								className={s.menuButton}>
								로그아웃
							</Button>
						</Flex>
					)}
				</Flex>
			</div>
		</div>
	);
};

export default MobileMenuBox;
