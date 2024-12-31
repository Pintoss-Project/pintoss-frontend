import { NextRequest, NextResponse } from 'next/server';
import { ErrorResponse } from '@/models/error';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
	try {
		// Set-Cookie 헤더에서 accessToken 쿠키 추출
		const accessToken = req.cookies.get('accessToken')?.value;

		if (!accessToken) {
			return NextResponse.json({ errorMessage: '토큰이 누락되었습니다.' }, { status: 401 });
		}

		// Authorization 쿠키 제거
		const res = NextResponse.json({});
		if (req.cookies.get('Authorization')?.value === '') {
			res.cookies.set('Authorization', '', {
				path: '/',
				maxAge: -1, // 즉시 만료
			});
		}

		const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/user_info`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Cookie': `accessToken=${accessToken}`, // accessToken만 포함
				'Access-Control-Allow-Origin': '*',
			},
			credentials: 'include', // 쿠키를 포함하여 요청
		});

		if (!response.ok) {
			const errorResponse: ErrorResponse = await response.json();
			return NextResponse.json(
				{ errorMessage: errorResponse.errorMessage || '유저 정보 조회에 실패했습니다.' },
				{ status: response.status },
			);
		}

		const data = await response.json();

		// Set-Cookie 헤더 전달
		const setCookieHeader = response.headers.get('set-cookie');
		if (setCookieHeader) {
			res.headers.append('Set-Cookie', setCookieHeader);
		}

		return NextResponse.json(data);
	} catch (error) {
		console.error('API 요청 중 오류 발생:', error);
		return NextResponse.json(
			{ errorMessage: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
			{ status: 500 },
		);
	}
}
