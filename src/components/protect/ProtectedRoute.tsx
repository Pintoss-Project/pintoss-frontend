'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

const protectedRoutes = ['/order', '/my-page'];

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();
	const pathname = usePathname();
	const { isAuthenticated } = useAuth();

	useEffect(() => {
		const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

		if (!isAuthenticated && isProtectedRoute) {
			router.push('/login');
		}
	}, [isAuthenticated, pathname, router]);

	if (!isAuthenticated && protectedRoutes.some((route) => pathname.startsWith(route))) {
		return null;
	}

	return <>{children}</>;
};

export default ProtectedRoute;
