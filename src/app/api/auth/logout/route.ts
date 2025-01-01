import { ErrorResponse } from '@/models/error';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	try {
		// 쿠키 읽기
		const accessToken = req.cookies.get('accessToken')?.value;

		if (!accessToken) {
			console.warn('No access token found');
			return NextResponse.json(
				{ errorMessage: '로그아웃 요청에 유효한 토큰이 없습니다.' },
				{ status: 400 },
			);
		}

		// 외부 API 로그아웃 호출
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/logout`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${accessToken}`, // 토큰 포함
			},
			credentials: 'include',
		});

		if (!response.ok) {
			const errorResponse: ErrorResponse = await response.json();
			return NextResponse.json(
				{ errorMessage: errorResponse.errorMessage || '로그아웃에 실패했습니다.' },
				{ status: response.status },
			);
		}

		// 쿠키 삭제
		const res = NextResponse.json({ message: '로그아웃 성공' });
		res.cookies.set('accessToken', '', {
			path: '/',
			maxAge: -1, // 즉시 만료
		});

		return res;
	} catch (error) {
		console.error('로그아웃 요청 중 오류 발생:', error);
		return NextResponse.json(
			{ errorMessage: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
			{ status: 500 },
		);
	}
}
