'use client';

import authState from '@/recoil/authAtom';
import { checkExpiration } from '@/utils/checkTokenExpiration';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { useRecoilState } from 'recoil';

interface Props {
	children: ReactNode;
}

const CheckTokenProvider = ({ children }: Props) => {
	const path = usePathname();
	const [authStateValue, setAuthStateValue] = useRecoilState(authState);
	const router = useRouter();

	const { isAdminLoggedIn, isLoggedIn } = authStateValue;

	useEffect(() => {
		const token = checkExpiration();

		if (!token) {
			setAuthStateValue({ isLoggedIn: false, isAdminLoggedIn: false });
			if (!isAdminLoggedIn) {
				if (path.includes('admin')) {
					router.push('/admin/login');
				}
			}

			if (!isLoggedIn) {
				if (!path.includes('admin')) {
					router.push('/login');
				}
			}
		}

		const interval = setInterval(() => {
			checkExpiration();
		}, 1000 * 60);

		return () => clearInterval(interval);
	}, []);

	return <div>{children}</div>;
};

export default CheckTokenProvider;
