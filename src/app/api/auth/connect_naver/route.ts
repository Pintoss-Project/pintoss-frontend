import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	try {
		const { code, state } = await req.json();
		const token = req.headers.get('Authorization')?.split(' ')[1];

		if (!token) {
			return NextResponse.json({ errorMessage: '인증 토큰이 없습니다.' }, { status: 401 });
		}

		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/oauth/naver/callback`,
			{
				method: 'POST',
				headers: {
					'Authorization': `bearer ${token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ code, state }),
			},
		);

		if (!response.ok) {
			const errorResponse = await response.json();
			return NextResponse.json(
				{ errorMessage: errorResponse.errorMessage || '네이버 계정 연동에 실패했습니다.' },
				{ status: response.status },
			);
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error('네이버 계정 연동 중 오류 발생:', error);
		return NextResponse.json(
			{ errorMessage: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
			{ status: 500 },
		);
	}
}
