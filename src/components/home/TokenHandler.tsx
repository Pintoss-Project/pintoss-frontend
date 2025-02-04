'use client';

import authState from '@/recoil/authAtom';
import { setLocalToken } from '@/utils/localToken';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

interface TokenHandlerProps {
	accessToken?: string;
}

export default function TokenHandler({ accessToken }: TokenHandlerProps) {
	const [user, setUser] = useRecoilState(authState);

	useEffect(() => {
		if (accessToken) {
			setLocalToken(accessToken as string);
		} else {
			setUser((prev) => ({ ...prev, isLoggedIn: false }));
		}
	}, [accessToken]);

	return null;
}
