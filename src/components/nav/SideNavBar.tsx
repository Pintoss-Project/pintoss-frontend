'use client';

import { usePathname } from 'next/navigation';
import * as s from './NavBarStyle.css';
import { CultureLandLogo, KakaoDetailLogo } from '../../../public/svgs';
import { Flex, List } from '@/shared/components/layout';
import SideNavBarProductsForSale from './SideNavBarProductsForSale';
import Spacing from '@/shared/components/layout/Spacing';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { getProductListForSideBar } from '@/app/api/product/getProductList';

const EXCLUDE_PATH = ['/login', '/register'];

const SideNavBar = () => {
	const path = usePathname();

	const { data: products } = useQuery({
		queryKey: ['sidebarProductList'],
		queryFn: getProductListForSideBar,
	});

	if (EXCLUDE_PATH.includes(path) || path.includes('admin')) return null;

	return (
		<div className={s.sideBarContainer}>
			<span className={s.grayText}>판매 상품</span>
			<Spacing margin="26px" />
			<List spacing={35}>
				{products?.data.map((item) => (
					<SideNavBarProductsForSale key={item.id} svg={CultureLandLogo} name={item.name} />
				))}
			</List>
			<Spacing margin="56px" />
			<Flex direction="column">
				<span className={s.grayText}>대량 구매문의</span>
				<Spacing margin="11px" />
				<span className={s.darkBlueText}>1544-4202</span>
				<Spacing margin="10px" />
				<Flex>
					<Image src={KakaoDetailLogo} alt="카카오 상세 로고 이미지" width={19} height={18} />
					<span className={s.brownText}>카카오톡 m4202</span>
				</Flex>
			</Flex>
		</div>
	);
};

export default SideNavBar;
