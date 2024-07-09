'use client';

import * as s from './NavBarStyle.css';

import { Flex } from '@/shared/components/layout';
import { PintossColorLogo } from '../../../public/svgs';

import Image from 'next/image';
import Link from 'next/link';
import NavBarTopMenuBox from './NavBarTopMenuBox';
import { usePathname } from 'next/navigation';

const NavBarTop = () => {
	const path = usePathname();

	if (path.includes('admin')) return null;

	return (
		<Flex justify="space-between" align="center" className={s.navbarTopBox}>
			<Link href="/">
				<Image src={PintossColorLogo} alt="로고 이미지" width={165} height={45} />
			</Link>
			<NavBarTopMenuBox />
		</Flex>
	);
};

export default NavBarTop;
