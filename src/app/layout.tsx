import Footer from '@/components/footer/Footer';
import NavBarTop from '@/components/nav/NavBarTop';
import '@/shared/styles';

import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: '핀토스',
	description: 'Where to find great deals on gift certificates',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ko">
			<body>
				<NavBarTop />
				{children}
				<Footer />
			</body>
		</html>
	);
}
