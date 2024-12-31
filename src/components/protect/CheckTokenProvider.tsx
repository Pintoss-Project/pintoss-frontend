'use client';

import authState from '@/recoil/authAtom';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

interface Props {
	children: ReactNode;
}

const CheckTokenProvider = ({ children }: Props) => {
	const path = usePathname();
	const isLoggedIn = useRecoilValue(authState).isLoggedIn;
	const router = useRouter();

	useEffect(() => {
		if (!isLoggedIn) {
			// 사용자가 로그아웃 상태일 때 리다이렉션 처리
			if (path.includes('admin')) {
				router.push('/admin/login');
			} else {
				router.push('/login');
			}
		}
	}, [isLoggedIn, path, router]);

	return <div>{children}</div>;
};

export default CheckTokenProvider;
