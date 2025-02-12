import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();

		const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});

		if (!response.ok) {
			const errorResponse = await response.json();
			return NextResponse.json(
				{ errorMessage: errorResponse.errorMessage || '로그인 실패' },
				{ status: response.status },
			);
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error('로그인 중 오류 발생:', error);
		return NextResponse.json(
			{ errorMessage: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
			{ status: 500 },
		);
	}
}
