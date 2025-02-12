import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);
		const id = searchParams.get('id');

		if (!id) {
			return NextResponse.json(
				{ errorMessage: '사이트 ID가 제공되지 않았습니다.' },
				{ status: 400 },
			);
		}

		const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/site-info/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			const errorResponse = await response.json();
			return NextResponse.json(
				{ errorMessage: errorResponse.errorMessage || '사이트 정보를 불러오는데 실패했습니다.' },
				{ status: response.status },
			);
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.warn('Error fetching site info:', error);
		return NextResponse.json(
			{ errorMessage: '사이트 정보를 불러오는 중 오류가 발생했습니다.' },
			{ status: 500 },
		);
	}
}
