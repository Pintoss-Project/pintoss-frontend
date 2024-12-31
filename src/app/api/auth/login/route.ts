import { ErrorResponse } from '@/models/error';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	try {
		// 클라이언트로부터 받은 로그인 데이터
		const loginData = await req.json();

		// 외부 API 호출
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(loginData),
			credentials: 'include', // 쿠키를 포함하도록 설정
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
		const res = NextResponse.json(data);

		if (setCookieHeader) {
			res.headers.set('Set-Cookie', setCookieHeader);
		}

		return res;
	} catch (error) {
		console.error('Proxy 서버 요청 중 오류 발생:', error);
		return NextResponse.json(
			{ errorMessage: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
			{ status: 500 },
		);
	}
}
