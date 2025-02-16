'use client';

import { useAuth } from '@/contexts/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

interface Props {
	children: ReactNode;
}

const CheckTokenProvider = ({ children }: Props) => {
	const path = usePathname();
	const { isAuthenticated } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!isAuthenticated) {
			// 사용자가 로그아웃 상태일 때 리다이렉션 처리
			if (path.includes('admin')) {
				router.push('/admin/login');
			} else {
				router.push('/login');
			}
		}
	}, [isAuthenticated, path, router]);

	return <div>{children}</div>;
};

export default CheckTokenProvider;
