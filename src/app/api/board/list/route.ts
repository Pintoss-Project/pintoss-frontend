import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);
		const type = searchParams.get('type') || '';

		const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/board?type=${type}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			const errorResponse = await response.json();
			return NextResponse.json(
				{ errorMessage: errorResponse.errorMessage || '게시판 목록 조회 중 오류가 발생했습니다.' },
				{ status: response.status },
			);
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error('Error fetching board list:', error);
		return NextResponse.json(
			{ errorMessage: '게시판 목록 조회 중 오류가 발생했습니다.' },
			{ status: 500 },
		);
	}
}
