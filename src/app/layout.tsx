import Footer from '@/components/footer/Footer';
import NavBarTop from '@/components/nav/NavBarTop';
import SideNavBar from '@/components/nav/SideNavBar';
import { AlertContextProvider } from '@/contexts/AlertContext';
import { Flex } from '@/shared/components/layout';
import '@/shared/styles';
import 'react-quill/dist/quill.snow.css';
import Providers from '@/react-query/Providers';
import RecoilRootProvider from '@/recoil/RecoilRootProvider';
import type { Metadata } from 'next';
import Head from 'next/head';
import { fetchUserInfo } from '@/app/api/user/fetchUserInfo';

export const metadata: Metadata = {
	title: '핀토스',
	description: 'Where to find great deals on gift certificates',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const userInfo = await fetchUserInfo();

	return (
		<html lang="ko">
			<Head>
				<meta charSet="EUC-KR" />
			</Head>
			<body>
				<Providers>
					<RecoilRootProvider>
						<AlertContextProvider>
							<NavBarTop data={userInfo} />
							<Flex justify="center">
								<SideNavBar />
								<div style={{ width: '100%' }}>
									{children}
									<Footer />
								</div>
							</Flex>
						</AlertContextProvider>
					</RecoilRootProvider>
				</Providers>
			</body>
		</html>
	);
}
