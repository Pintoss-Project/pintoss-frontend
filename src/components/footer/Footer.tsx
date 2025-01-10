'use client';

import * as cs from '@/shared/styles/common.css';
import * as s from './FooterStyle.css';

import { fetchSiteInfo } from '@/app/api/site/fetchSiteInfo';
import { fetchSiteList } from '@/app/api/site/fetchSiteList';
import { Flex } from '@/shared/components/layout';
import Spacing from '@/shared/components/layout/Spacing';
import { vars } from '@/shared/styles/theme.css';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PintossLogo } from '../../../public/svgs';
import ProtectedRoute from '../protect/ProtectedRoute';

const Footer = () => {
	const path = usePathname();

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

	if (path.includes('admin')) return null;

	return (
		<ProtectedRoute>
			<div className={s.footerBox}>
				<Spacing margin="44px" />
				<Flex justify="space-between" className={s.footerFlexBox}>
					<div className={s.footerLeftBox}>
						<div className={s.responsiveBox}>
							<Link href="/">
								<Image src={PintossLogo} alt="로고 이미지" width={165} height={45} />
							</Link>
						</div>
						<Spacing margin="25px" />
						<p className={s.pText}>(47190) {siteInfo?.data.address}</p>
						<Spacing margin="8px" />
						<p className={s.pText}>
							대표 {siteInfo?.data.owner} l 사업자등록번호: {siteInfo?.data.businesses} l
							통신판매번호 2024-부산진-1016 l Email : {siteInfo?.data.email}
						</p>
						<Spacing margin="8px" />
						<p className={s.pText}>
							고객센터 주소 : {siteInfo?.data.address} l 핀토스 고객센터 Tel:{siteInfo?.data.tel}{' '}
						</p>
						<Spacing margin="8px" />
						<p className={s.pText}>Copyright 핀토스 Information Service.All rights reserved</p>
						<Spacing margin="25px" />
						<div className={s.responsiveBox}>
							<Flex justify="center" align="center" className={cs.darkBlueButton}>
								<a href="mailto:c0818@naver.com" style={{ color: vars.color.white }}>
									대량구매/제휴문의 : {siteInfo?.data.email}
								</a>
							</Flex>
						</div>
						<Spacing margin="20px" />
						<div className={s.responsiveBox}>
							<p className={s.pText} style={{ color: vars.color.lightGray }}>
								ⓒ 핀토스. All rights reserved.
							</p>
						</div>
					</div>
					<Flex direction="column" className={s.footerRightBox}>
						<div style={{ color: vars.color.darkerGray, fontSize: '18px', fontWeight: '600' }}>
							고객센터
						</div>
						<Spacing margin="15px" />
						<div style={{ color: vars.color.darkBlue, fontSize: '30px', fontWeight: 'bold' }}>
							{siteInfo?.data.tel}
						</div>
						<Spacing margin="5px" />
						<p style={{ color: vars.color.darkerGray, fontSize: '18px' }}>
							{siteInfo?.data.businessHour}
						</p>
						<Spacing margin="20px" />
						<div>
							<Link href="/privacy" style={{ color: vars.color.darkBlue, fontSize: '15px' }}>
								개인정보 처리방침
							</Link>
							<Link
								href="/usepolicy"
								style={{ color: vars.color.mediumGray, marginLeft: '14px', fontSize: '15px' }}>
								이용약관
							</Link>
						</div>
						<Spacing margin="40px" />
						<img
							src="/images/secure-transaction.gif"
							alt="안전 거래 가맹점 이미지"
							className={s.secureTransactionImage}
						/>
					</Flex>
				</Flex>
			</div>
			<Spacing margin="34px" />
		</ProtectedRoute>
	);
};

export default Footer;
