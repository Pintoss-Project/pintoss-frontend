import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function PATCH(req: NextRequest) {
	try {
		const { productId, categoryId, data: stock } = await req.json();

		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/product/${productId}/category/${categoryId}/stock`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(stock),
			},
		);

		if (!response.ok) {
			const errorResponse = await response.json();
			return NextResponse.json(
				{ errorMessage: errorResponse.errorMessage || '재고 업데이트에 실패했습니다.' },
				{ status: response.status },
			);
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error('Error updating stock:', error);
		return NextResponse.json(
			{ errorMessage: '재고 업데이트 중 오류가 발생했습니다.' },
			{ status: 500 },
		);
	}
}
