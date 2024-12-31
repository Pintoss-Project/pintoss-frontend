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
import CheckTokenProvider from '@/components/protect/CheckTokenProvider';
import Head from 'next/head';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
	title: '핀토스',
	description: 'Where to find great deals on gift certificates',
};

async function checkAuthentication() {
	const cookieStore = cookies();
	const accessToken = cookieStore.get('accessToken')?.value;

	if (!accessToken) {
		redirect('/login');
	}

	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/user_info`, {
			method: 'GET',
			headers: {
				Cookie: `accessToken=${accessToken}`,
			},
		});

		if (!response.ok) {
			redirect('/login');
		}

		return response.json();
	} catch (error) {
		console.error('Authentication check failed:', error);
		redirect('/login');
	}
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	await checkAuthentication(); // 인증 확인
	return (
		<html lang="ko">
			<Head>
				<meta charSet="EUC-KR" />
				<script
					defer
					type="text/javascript"
					src="https://pay.billgate.net/paygate/plugin/gx_web_client.js"
				/>
			</Head>
			<body>
				<Providers>
					<RecoilRootProvider>
						<AlertContextProvider>
							<NavBarTop />
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
