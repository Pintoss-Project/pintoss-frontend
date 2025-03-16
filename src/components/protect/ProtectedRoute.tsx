'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

const protectedRoutes = ['/order', '/my-page'];

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();
	const pathname = usePathname();
	const { isAuthenticated, loading } = useAuth();

	useEffect(() => {
		if (loading) {
			return;
		}
		const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

		if (!isAuthenticated && isProtectedRoute) {
			router.push('/login');
		}
	}, [isAuthenticated, loading, pathname, router]);

	if (loading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<div className="text-2xl font-bold">Loading...</div>
			</div>
		);
	}

	if (!isAuthenticated && protectedRoutes.some((route) => pathname.startsWith(route))) {
		return null;
	}

	return <>{children}</>;
};

export default ProtectedRoute;
