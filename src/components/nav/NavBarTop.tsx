'use client';

import * as s from './NavBarStyle.css';
import { Flex } from '@/shared/components/layout';
import { PintossColorLogo } from '../../../public/svgs';
import Image from 'next/image';
import Link from 'next/link';
import NavBarTopMenuBox from './NavBarTopMenuBox';
import { usePathname } from 'next/navigation';
import GradientFiMenu from '../icons/GradientFiMenu';
import { useState } from 'react';
import MobileMenuBox from '../responsive/MobileMenuBox';

const NavBarTop = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const path = usePathname();

	if (path.includes('admin')) return null;

	const handleMenuClick = () => {
		setIsMenuOpen(true);
	};

	return (
		<Flex justify="space-between" align="center" className={s.navbarTopBox}>
			<img src="/images/cart-icon.png" alt="장바구니 아이콘" className={s.cartIcon} />
			<Link href="/" className={s.logoBox}>
				<div className={s.logoBox}>
					<Image src={PintossColorLogo} alt="로고 이미지" fill style={{ objectFit: 'contain' }} />
				</div>
			</Link>
			<NavBarTopMenuBox />
			<div onClick={handleMenuClick} className={s.gradientMenuIconWrap}>
				<GradientFiMenu className={s.gradientMenuIcon} />
			</div>
			{isMenuOpen && <MobileMenuBox setIsMenuOpen={setIsMenuOpen} />}
		</Flex>
	);
};

export default NavBarTop;
