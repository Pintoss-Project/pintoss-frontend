import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);
		const category = searchParams.get('category') || '';

		let apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/product`;
		if (category && category !== 'ALL') {
			apiUrl += `?category=${encodeURIComponent(category)}`;
		}

		const response = await fetch(apiUrl, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			const errorResponse = await response.json();
			return NextResponse.json(
				{ errorMessage: errorResponse.errorMessage || '상품 목록을 가져오는 데 실패했습니다.' },
				{ status: response.status },
			);
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		return NextResponse.json(
			{ errorMessage: '상품 목록을 가져오는 중 오류가 발생했습니다.' },
			{ status: 500 },
		);
	}
}
