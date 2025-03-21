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
// import { API_HOST_URL } from '@/utils/fetchServer';

export const metadata: Metadata = {
	title: '핀토스',
	description: 'Where to find great deals on gift certificates',
};

// const getAccessToken = () => {
// 	const cookieStore = cookies();
// 	return cookieStore.get('accessToken')?.value;
// };

// async function fetchUserInfo() {
// 	const accessToken = getAccessToken();
// 	const response = await fetch(`${API_HOST_URL}/api/users/info`, {
// 		method: 'GET',
// 		credentials: 'include',
// 		headers: {
// 			'Authorization': `Bearer ${accessToken}`,
// 		},
// 	});

// 	if (!response.ok) {
// 		console.error(`Failed to fetch user info: ${response.status}`);
// 		return null;
// 	}

// 	const data = await response.json();
// 	return data.data;
// }

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	// const userInfo = await fetchUserInfo();

	const cookieStore = cookies();
	const accessTokenCookie = cookieStore.get('accessToken')?.value;

	return (
		<html lang="ko">
			<body>
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
