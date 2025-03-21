'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './HomeBannerSwiper.css';

import SwiperCore from 'swiper';
import { Autoplay, Navigation, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useQuery } from '@tanstack/react-query';
import * as s from './HomeStyle.css';
import { fetchBannerList } from '@/controllers/site/fetchBannerList';
import { useEffect, useState } from 'react';
import { Flex } from '@/shared/components/layout';
import useWindowDimensions from '@/utils/window-dimensions';

const HomeBanner = () => {
	SwiperCore.use([Navigation, Scrollbar]);
	const [currentBannerUrlList, setCurrentBannerUrlList] = useState<string[]>([]);

	const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });

	const dimensions = useWindowDimensions();

	const { data: bannerList } = useQuery({
		queryKey: ['bannerList'],
		// queryFn: fetchBannerList,
		queryFn: () => {
			return {
				data: [
					{
						id: 1,
						bannerTitle: "여름 세일",
						bannerLink: "/summer-sale",
						desktopImageUrl: "/images/banner-bg.jpg",
						mobileImageUrl: "/images/banner-bg.jpg",
						createdAt: "2024-01-01",
						updatedAt: "2024-01-01"
					},
				]
			}
		},
	});

	const updateBannerImages = () => {
		const isMobile = window.innerWidth <= 768;
		const bannerUrls = bannerList?.data.map((banner) =>
			isMobile && banner.mobileImageUrl ? banner.mobileImageUrl : banner.desktopImageUrl,
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


	// mobile: 'only screen and (max-width: 430px)',
	// tabletSmall: 'only screen and (max-width: 768px)',
	// tablet: 'only screen and (max-width: 1024px)',
	// desktop: 'only screen and (min-width: 1025px)',

	const isMobile = dimensions.width <= 430;
	const isTabletSmall = dimensions.width <= 768;
	const isTablet = dimensions.width <= 1024;
	const isDesktop = dimensions.width > 1024;

	const IMAGE_SIZE = {
		mobile: {
			width: '100%',
			height: '200px',
		},
		tabletSmall: {
			width: '100%',
			height: '200px',
		},
		tablet: {
			width: '100%',
			height: '200px',
		},
		desktop: {
			width: '100%',
			height: '300px',
		},
	}

	return (
		<div style={{
			marginTop: '12px',
		}}>
			{/* <div className={s.homeBanner}>
				<div className={s.homeBannerContent}> */}
			<div
				style={{
					width: dimensions.width <= 1024 ? `${dimensions.width - 54}px` : '100%',
					height: dimensions.width <= 1024 ? '200px' : '300px'
				}}>
				<div
					onResize={(event) => {
						setContainerDimensions({
							width: event.currentTarget.clientWidth -20,
							height: event.currentTarget.clientHeight,
						});
					}}
					style={{ width: '100%', height: '100%', backgroundColor: 'transparent', borderRadius: '15px' }}>
					{currentBannerUrlList && currentBannerUrlList.length > 0 && (
						<Swiper
							loop={true}
							autoplay={{ delay: 3000 }}
							// spaceBetween={20}
							// navigation={true}
							modules={[Autoplay]}>
							{bannerList?.data.map((banner, index) => (
								<SwiperSlide key={index}>
									<a href={banner.bannerLink}>
										<img
											src={currentBannerUrlList[index]}
											alt={`배너 이미지 ${index + 1}`}
											style={{
												width: IMAGE_SIZE[isMobile ? 'mobile' : isTabletSmall ? 'tabletSmall' : isTablet ? 'tablet' : 'desktop'].width,
												height: IMAGE_SIZE[isMobile ? 'mobile' : isTabletSmall ? 'tabletSmall' : isTablet ? 'tablet' : 'desktop'].height,
												// maxHeight: '480px',
												borderRadius: '15px 15px 15px 15px',
												objectFit: 'cover',
											}}
										/>
									</a>
								</SwiperSlide>
							))}
						</Swiper>
					)}
				</div>
			</div>
			<div style={{ height: '40px' }}></div>
		</div>
	);
};

export default HomeBanner;
