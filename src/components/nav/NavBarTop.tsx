'use client';

import * as s from './NavBarStyle.css';
import { Flex } from '@/shared/components/layout';
import { PintossColorLogo } from '../../../public/svgs';
import Image from 'next/image';
import Link from 'next/link';
import NavBarTopMenuBox from './NavBarTopMenuBox';
import { usePathname } from 'next/navigation';
import GradientFiMenu from '../icons/GradientFiMenu';

const NavBarTop = () => {
	const path = usePathname();

	if (path.includes('admin')) return null;

	return (
		<Flex justify="space-between" align="center" className={s.navbarTopBox}>
			<img src="/images/cart-icon.png" alt="장바구니 아이콘" className={s.cartIcon} />
			<Link href="/" className={s.logoBox}>
				<div className={s.logoBox}>
					<Image src={PintossColorLogo} alt="로고 이미지" fill style={{ objectFit: 'contain' }} />
				</div>
			</Link>
			<NavBarTopMenuBox />
			<GradientFiMenu className={s.gradientMenuIcon} />
		</Flex>
	);
};

export default NavBarTop;
