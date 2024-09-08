'use client';

import { useQuery } from '@tanstack/react-query';
import * as s from './HomeStyle.css';
import { fetchBannerList } from '@/app/api/site/fetchBannerList';
import { useEffect, useState } from 'react';

const HomeBanner = () => {
	const [currentBannerUrlList, setCurrentBannerUrlList] = useState<string[]>([]);

	const { data: bannerList } = useQuery({
		queryKey: ['bannerList'],
		queryFn: fetchBannerList,
	});

	const updateBannerImages = () => {
		const isMobile = window.innerWidth <= 768;
		const bannerUrls = bannerList?.data.map((banner) =>
			isMobile ? banner.mobileImageUrl : banner.desktopImageUrl,
		);
		setCurrentBannerUrlList(bannerUrls as string[]);
	};

	useEffect(() => {
		if (bannerList && bannerList?.data?.length > 0) {
			updateBannerImages();
			window.addEventListener('resize', updateBannerImages);
		}
		return () => window.removeEventListener('resize', updateBannerImages);
	}, [bannerList]);

	return (
		<div className={s.homeBanner}>
			<div className={s.homeBannerContent}>
				{bannerList && bannerList?.data.length > 0 && (
					<a href={bannerList?.data[0]?.bannerLink}>
						<img
							src={currentBannerUrlList[0]}
							alt="배너 이미지"
							style={{ width: '100%', height: '100%' }}
						/>
					</a>
				)}
			</div>
		</div>
	);
};

export default HomeBanner;
