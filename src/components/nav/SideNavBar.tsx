'use client';
import { fetchSimpleProductList } from '@/app/api/product/fetchSimpleProductList';
import { fetchSiteInfo } from '@/app/api/site/fetchSiteInfo';
import { fetchSiteList } from '@/app/api/site/fetchSiteList';
import { Flex, List } from '@/shared/components/layout';
import Spacing from '@/shared/components/layout/Spacing';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import ProtectedRoute from '@/components/protect/ProtectedRoute';
import * as s from './NavBarStyle.css';
import SideNavBarProductsForSale from './SideNavBarProductsForSale';
import { KakaoDetailLogo } from '../../../public/svgs';

const EXCLUDE_PATH = ['/login', '/register'];

const SideNavBar = () => {
	const path = usePathname();

	const { data: products } = useQuery({
		queryKey: ['simpleProductList'],
		queryFn: () => fetchSimpleProductList(''),
	});

	const { data: allSiteInfo } = useQuery({
		queryKey: ['allSiteInfo'],
		queryFn: () => fetchSiteList(),
	});

	const firstSiteInfoId =
		allSiteInfo && allSiteInfo?.data?.length > 0 ? allSiteInfo?.data[0].id : null;

	const { data: siteInfo } = useQuery({
		queryKey: ['siteInfo', firstSiteInfoId],
		queryFn: () => (firstSiteInfoId ? fetchSiteInfo(firstSiteInfoId) : Promise.resolve(null)),
		enabled: !!firstSiteInfoId,
	});

	if (EXCLUDE_PATH.includes(path) || path.includes('admin')) return null;

	return (
		<ProtectedRoute>
			<div className={s.sideBarContainer}>
				<span className={s.grayText}>판매 상품</span>
				<Spacing margin="26px" />
				<List spacing={35}>
					{products?.data.map((item) => (
						<SideNavBarProductsForSale
							key={item.id}
							svg={item.logoImageUrl as string}
							name={item.name}
							productId={item.id}
						/>
					))}
				</List>
				<Spacing margin="56px" />
				<Flex direction="column">
					<span className={s.grayText}>대량 구매문의</span>
					<Spacing margin="11px" />
					<span className={s.darkBlueText}>{siteInfo?.data.tel}</span>
					<Spacing margin="10px" />
					<Flex>
						<Image src={KakaoDetailLogo} alt="카카오 상세 로고 이미지" width={19} height={18} />
						<span className={s.brownText}>카카오톡 {siteInfo?.data.kakao}</span>
					</Flex>
				</Flex>
			</div>
		</ProtectedRoute>
	);
};

export default SideNavBar;
