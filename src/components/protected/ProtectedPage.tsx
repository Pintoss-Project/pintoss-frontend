'use client';

import { useRouter, usePathname } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import authState from '@/recoil/authAtom';

interface Props {
	children: ReactNode;
}

const ProtectedPage = ({ children }: Props) => {
	const authStateValue = useRecoilValue(authState);
	const { isLoggedIn } = authStateValue;
	const router = useRouter();
	const pathname = usePathname();

	const protectedPaths = ['/my-page', '/order/cart', '/order/list'];

	useEffect(() => {
		if (!isLoggedIn && protectedPaths.includes(pathname)) {
			router.push('/');
		}
	}, [isLoggedIn, pathname, router]);

	return <>{children}</>;
};

export default ProtectedPage;
