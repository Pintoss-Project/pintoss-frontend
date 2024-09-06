import { NextResponse } from 'next/server';

export async function GET() {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/product/popular`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			const errorResponse = await response.json();
			return NextResponse.json(
				{
					errorMessage: errorResponse.errorMessage || '인기 상품 목록을 가져오는 데 실패했습니다.',
				},
				{ status: response.status },
			);
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		return NextResponse.json(
			{ errorMessage: '인기 상품 목록을 가져오는 중 오류가 발생했습니다.' },
			{ status: 500 },
		);
	}
}
