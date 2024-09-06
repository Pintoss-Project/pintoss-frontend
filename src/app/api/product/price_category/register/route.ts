import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
	try {
		const { productId, stock, ...categories } = await req.json();

		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/product/${productId}/category`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					productId,
					stock,
					...categories,
				}),
			},
		);

		if (!response.ok) {
			const errorResponse = await response.json();
			return NextResponse.json(
				{ errorMessage: errorResponse.errorMessage || '상품권 가격 카테고리 생성에 실패했습니다.' },
				{ status: response.status },
			);
		}

		const responseData = await response.json();
		return NextResponse.json(responseData);
	} catch (error) {
		return NextResponse.json(
			{ errorMessage: '상품권 가격 카테고리 생성 중 오류가 발생했습니다.' },
			{ status: 500 },
		);
	}
}
