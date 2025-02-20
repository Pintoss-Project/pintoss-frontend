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

const HomeBanner = () => {
	SwiperCore.use([Navigation, Scrollbar]);
	const [currentBannerUrlList, setCurrentBannerUrlList] = useState<string[]>([]);

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
						desktopImageUrl: "https://picsum.photos/1920/480",
						mobileImageUrl: "https://picsum.photos/640/480",
						createdAt: "2024-01-01",
						updatedAt: "2024-01-01"
					},
					{
						id: 2,
						bannerTitle: "신상품 컬렉션",
						bannerLink: "/new-collection",
						desktopImageUrl: "https://picsum.photos/1920/480?random=2",
						mobileImageUrl: "https://picsum.photos/640/480?random=2",
						createdAt: "2024-01-02",
						updatedAt: "2024-01-02"
					},
					{
						id: 3,
						bannerTitle: "특별 할인",
						bannerLink: "/special-offers",
						desktopImageUrl: "https://picsum.photos/1920/480?random=3",
						mobileImageUrl: "https://picsum.photos/640/480?random=3",
						createdAt: "2024-01-03",
						updatedAt: "2024-01-03"
					}
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

	return (
		<Flex justify="center">
			<div className={s.homeBanner}>
				<div className={s.homeBannerContent}>
					{currentBannerUrlList && currentBannerUrlList.length > 0 && (
						<Swiper
							loop={true}
							autoplay={{ delay: 3000 }}
							spaceBetween={20}
							navigation={true}
							modules={[Autoplay, Navigation]}>
							{bannerList?.data.map((banner, index) => (
								<SwiperSlide key={index}>
									<a href={banner.bannerLink}>
										<img
											src={currentBannerUrlList[index]}
											alt={`배너 이미지 ${index + 1}`}
											style={{
												width: '100%',
												height: '100%',
												maxHeight: '480px',
												borderRadius: '0 15px 15px 15px',
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
		</Flex>
	);
};

export default HomeBanner;
