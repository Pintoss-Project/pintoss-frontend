'use client';

import { removeLocalToken, setLocalToken } from '@/utils/localToken';
import { useEffect } from 'react';

interface TokenHandlerProps {
	accessToken?: string;
}

export default function TokenHandler({ accessToken }: TokenHandlerProps) {
	useEffect(() => {
		if (accessToken) {
			setLocalToken(accessToken as string);
		} else {
			removeLocalToken();
		}
	}, [accessToken]);

	return null;
}
