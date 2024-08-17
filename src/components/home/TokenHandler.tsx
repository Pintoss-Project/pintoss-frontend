'use client';

import authState from '@/recoil/authAtom';
import { removeLocalToken, setLocalToken } from '@/utils/localToken';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

interface TokenHandlerProps {
	accessToken?: string;
}

export default function TokenHandler({ accessToken }: TokenHandlerProps) {
	const authStateValue = useRecoilValue(authState);

	useEffect(() => {
		if (accessToken) {
			setLocalToken(accessToken as string);
		} else {
			if (!authStateValue.isLoggedIn) {
				removeLocalToken();
			}
		}
	}, [accessToken]);

	return null;
}
