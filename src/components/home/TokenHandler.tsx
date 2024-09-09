'use client';

import { setLocalToken } from '@/utils/localToken';
import { useEffect } from 'react';

interface TokenHandlerProps {
	accessToken?: string;
}

export default function TokenHandler({ accessToken }: TokenHandlerProps) {
	useEffect(() => {
		if (accessToken) {
			setLocalToken(accessToken as string);
		}
	}, [accessToken]);

	return null;
}
