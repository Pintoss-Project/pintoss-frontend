import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
	if (request.headers.get('x-forwarded-proto') !== 'https') {
		return NextResponse.redirect(
			`https://${request.headers.get('host')}${request.nextUrl.pathname}`,
			301,
		);
	}
}

export const config = {
	matcher: '/:path*',
};
