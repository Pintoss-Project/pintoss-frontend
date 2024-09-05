'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import authState from '@/recoil/authAtom';

const protectedRoutes = ['/order', '/my-page'];

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();
	const pathname = usePathname();
	const authStateValue = useRecoilValue(authState);
	const { isLoggedIn } = authStateValue;

	useEffect(() => {
		const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

		if (!isLoggedIn && isProtectedRoute) {
			router.push('/login');
		}
	}, [isLoggedIn, pathname, router]);

	if (!isLoggedIn && protectedRoutes.some((route) => pathname.startsWith(route))) {
		return null;
	}

	return <>{children}</>;
};

export default ProtectedRoute;
