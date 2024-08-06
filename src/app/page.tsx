import * as s from '@/components/home/HomeStyle.css';
import CategorySection from '@/components/home/CategorySection';
import Spacing from '@/shared/components/layout/Spacing';
import HomeBanner from '@/components/home/HomeBanner';
import HomeServiceInfoBox from '@/components/home/HomeServiceInfoBox';
import HomeRecruitingBanner from '@/components/home/HomeRecruitingBanner';
import HomeAnnouncementsBoard from '@/components/home/HomeAnnouncementsBoard';
import HomePopularProducts from '@/components/home/HomePopularProducts';
import HomeProductsOnSale from '@/components/home/HomeProductsOnSale';

export default function Home() {
	return (
		<main className={s.homeSection}>
			<HomeBanner />
			<Spacing margin="42px" />
			<CategorySection title="인기 상품" products={<HomePopularProducts />} />
			<Spacing margin="74px" />
			<CategorySection title="판매 상품" products={<HomeProductsOnSale />} filter />
			<Spacing margin="60px" />
			<HomeServiceInfoBox />
			<Spacing margin="60px" />
			<HomeAnnouncementsBoard />
			<Spacing margin="60px" />
		</main>
	);
}
