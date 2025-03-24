import Footer from '@/components/footer/Footer';
import NavBarTop from '@/components/nav/NavBarTop';
import SideNavBar from '@/components/nav/SideNavBar';
import { AlertContextProvider } from '@/contexts/AlertContext';
import { Flex } from '@/shared/components/layout';
import '@/shared/styles';
import 'react-quill/dist/quill.snow.css';
import Providers from '@/react-query/Providers';
import RecoilRootProvider from '@/recoil/RecoilRootProvider';
import type { Metadata } from "next";
import { cookies } from 'next/headers';
import { AuthProvider } from '@/contexts/AuthContext';
import { MainContainer } from '@/components/MainContainer';

export const metadata: Metadata = {
	title: '핀토스',
	description: 'Where to find great deals on gift certificates',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const cookieStore = cookies();
	const accessTokenCookie = cookieStore.get('accessToken')?.value;

	return (
		<html lang="ko">
			<body suppressHydrationWarning={true} >
				<Providers>
					<RecoilRootProvider>
						<AuthProvider initialUser={null} serverToken={accessTokenCookie}>
							<AlertContextProvider>
								<NavBarTop data={null} />
								<Flex justify="center">
									<SideNavBar />
									<MainContainer>
										{children}
										<Footer />
									</MainContainer>
								</Flex>
							</AlertContextProvider>
						</AuthProvider>
					</RecoilRootProvider>
				</Providers>
			</body>
		</html>
	);
}
