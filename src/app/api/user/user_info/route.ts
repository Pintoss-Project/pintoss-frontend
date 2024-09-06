import { NextRequest, NextResponse } from 'next/server';
import { ErrorResponse } from '@/models/error';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
	try {
		const token = req.headers.get('Authorization')?.split(' ')[1];

		if (!token) {
			return NextResponse.json({ errorMessage: '토큰이 누락되었습니다.' }, { status: 401 });
		}

		const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/user_info`, {
			method: 'GET',
			headers: {
				'Authorization': `bearer ${token}`,
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			const errorResponse: ErrorResponse = await response.json();
			return NextResponse.json(
				{ errorMessage: errorResponse.errorMessage || '유저 정보 조회에 실패했습니다.' },
				{ status: response.status },
			);
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error('API 요청 중 오류 발생:', error);
		return NextResponse.json(
			{ errorMessage: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
			{ status: 500 },
		);
	}
}
