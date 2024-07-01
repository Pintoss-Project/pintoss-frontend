import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: '핀토스',
	description: 'Where to find great deals on gift certificates',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ko">
			<body>{children}</body>
		</html>
	);
}
