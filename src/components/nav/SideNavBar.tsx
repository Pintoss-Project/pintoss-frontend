'use client';

import { usePathname } from 'next/navigation';
import * as s from './NavBarStyle.css';
import { CultureLandLogo, KakaoDetailLogo } from '../../../public/svgs';
import { Flex, List } from '@/shared/components/layout';
import SideNavBarProductsForSale from './SideNavBarProductsForSale';
import Spacing from '@/shared/components/layout/Spacing';
import Image from 'next/image';

const EXCLUDE_PATH = ['/login', '/register'];

const PRODUCTS_FOR_SALE_LIST = [
	{ id: 1, svg: CultureLandLogo, name: '북앤라이프 도서상품권' },
	{ id: 2, svg: CultureLandLogo, name: '북앤라이프 도서상품권' },
	{ id: 3, svg: CultureLandLogo, name: '북앤라이프 도서상품권' },
	{ id: 4, svg: CultureLandLogo, name: '북앤라이프 도서상품권' },
	{ id: 5, svg: CultureLandLogo, name: '북앤라이프 도서상품권' },
	{ id: 6, svg: CultureLandLogo, name: '북앤라이프 도서상품권' },
	{ id: 7, svg: CultureLandLogo, name: '북앤라이프 도서상품권' },
];

const SideNavBar = () => {
	const path = usePathname();

	if (EXCLUDE_PATH.includes(path)) return null;

	return (
		<div className={s.sideBarContainer}>
			<span className={s.grayText}>판매 상품</span>
			<Spacing margin="26px" />
			<List spacing={35}>
				{PRODUCTS_FOR_SALE_LIST.map((item) => (
					<SideNavBarProductsForSale key={item.id} svg={item.svg} name={item.name} />
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
