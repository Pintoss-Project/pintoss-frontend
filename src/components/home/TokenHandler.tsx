'use client';

import { useAuth } from '@/contexts/AuthContext';
import { setLocalToken } from '@/utils/localToken';
import { useEffect } from 'react';

interface TokenHandlerProps {
	accessToken?: string;
}

export default function TokenHandler({ accessToken }: TokenHandlerProps) {
	const {isAuthenticated,  login, logout} = useAuth();

	useEffect(() => {
		if (accessToken) {
			setLocalToken(accessToken as string);
			if(!isAuthenticated) login(accessToken as string);
		} else {
			setLocalToken('');
			if(isAuthenticated) logout();
		}
	}, [accessToken]);

	return null;
}
