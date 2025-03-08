'use client';
import * as s from './NavBarStyle.css';
import { Flex } from '@/shared/components/layout';
import Image from 'next/image';
import Link from 'next/link';
import NavBarTopMenuBox from './NavBarTopMenuBox';
import { usePathname } from 'next/navigation';
import GradientFiMenu from '@/components/icons/GradientFiMenu';
import { useState } from 'react';
import MobileMenuBox from '@/components/responsive/MobileMenuBox';
import ProtectedRoute from '@/components/protect/ProtectedRoute';
import { PintossColorLogo } from '../../../public/svgs';
import { UserInfo } from '@/models/user';
import { useAuth } from '@/contexts/AuthContext';

const NavBarTop = ({ data }: { data: UserInfo | null }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const {user, isAuthenticated} = useAuth();

	const path = usePathname();

	if (path.includes('admin')) return null;

	const handleMenuClick = () => {
		setIsMenuOpen(true);
	};

	return (
		<ProtectedRoute>
			<Flex justify="space-between" align="center" className={s.navbarTopBox}>
				{/* {isAuthenticated && (
					<Link href="/order/cart">
						<Image
							src="/images/cart-icon.png"
							alt="장바구니 아이콘"
							width={40} // Default width for larger screens
							height={40} // Default height for larger screens
							sizes="(max-width: 768px) 35px, (max-width: 480px) 30px, 40px" // Responsive sizes
							className={s.cartIcon}
						/>
					</Link>
				)} */}
				<Link href="/" className={s.logoBox}>
					<div>
						<Image src={PintossColorLogo} alt="로고 이미지" fill style={{ objectFit: 'contain' }} />
					</div>
				</Link>

				<NavBarTopMenuBox />
				<div onClick={handleMenuClick} className={s.gradientMenuIconWrap}>
					<GradientFiMenu className={s.gradientMenuIcon} />
				</div>
				{isMenuOpen && <MobileMenuBox setIsMenuOpen={setIsMenuOpen} />}
			</Flex>
		</ProtectedRoute>
	);
};

export default NavBarTop;
