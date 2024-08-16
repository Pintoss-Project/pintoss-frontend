'use client';

import { useEffect } from 'react';
import { setLocalToken } from '@/utils/localToken';
import { useSetRecoilState } from 'recoil';
import authState from '@/recoil/authAtom';

interface TokenHandlerProps {
	accessToken?: string;
}

export default function TokenHandler({ accessToken }: TokenHandlerProps) {
	const setAuthState = useSetRecoilState(authState);

	useEffect(() => {
		if (accessToken) {
			setLocalToken(accessToken); // 로컬 스토리지에 토큰 저장
			setAuthState({ isLoggedIn: true }); // 로그인 상태로 설정
		}
	}, [accessToken, setAuthState]);

	return null; // 이 컴포넌트는 UI를 렌더링하지 않음
}
