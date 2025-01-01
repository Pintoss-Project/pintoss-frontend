import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
	if (request.headers.get('x-forwarded-proto') !== 'https') {
		return NextResponse.redirect(
			`https://${request.headers.get('host')}${request.nextUrl.pathname}`,
			301,
		);
	}

	const accessToken = request.cookies.get('accessToken')?.value;

	const loginPath = '/login';

	// 로그인 페이지는 인증 검사를 건너뜀
	if (request.nextUrl.pathname === loginPath) {
		return NextResponse.next();
	}

	// 액세스 토큰이 없는 경우 로그인 페이지로 리디렉션
	if (!accessToken) {
		const url = request.nextUrl.clone();
		url.pathname = loginPath;
		return NextResponse.redirect(url);
	}

	// 기타 경우 요청을 허용
	return NextResponse.next();
}

export const config = {
	matcher: '/:path*',
};
