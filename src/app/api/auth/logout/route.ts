import { ErrorResponse } from '@/models/error';
import { NextResponse } from 'next/server';

export async function POST() {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/logout`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
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

		return NextResponse.json({ message: '로그아웃 성공' });
	} catch (error) {
		console.error('로그아웃 요청 중 오류 발생:', error);
		return NextResponse.json(
			{ errorMessage: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
			{ status: 500 },
		);
	}
}
