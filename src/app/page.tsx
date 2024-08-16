import HomeAnnouncementsBoard from '@/components/home/HomeAnnouncementsBoard';
import HomeBanner from '@/components/home/HomeBanner';
import HomeOnSaleSection from '@/components/home/HomeOnSaleSection';
import HomePopularSection from '@/components/home/HomePopularSection';
import HomeServiceInfoBox from '@/components/home/HomeServiceInfoBox';
import * as s from '@/components/home/HomeStyle.css';
import Spacing from '@/shared/components/layout/Spacing';
import { cookies } from 'next/headers';
import TokenHandler from '@/components/home/TokenHandler';

export default function Home() {
	const cookieStore = cookies();
	const accessTokenCookie = cookieStore.get('accessToken')?.value;

	return (
		<main className={s.homeSection}>
			<TokenHandler accessToken={accessTokenCookie} />
			<HomeBanner />
			<Spacing margin="42px" />
			<HomePopularSection title="인기 상품" />
			<Spacing margin="74px" />
			<HomeOnSaleSection title="판매 상품" />
			<Spacing margin="60px" />
			<HomeServiceInfoBox />
			<Spacing margin="60px" />
			<HomeAnnouncementsBoard />
			<Spacing margin="60px" />
		</main>
	);
}
