import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function PATCH(req: NextRequest) {
	try {
		const { productId, cardDiscount, phoneDiscount } = await req.json();

		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/product/${productId}/fee`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					cardDiscount,
					phoneDiscount,
				}),
			},
		);

		if (!response.ok) {
			const errorResponse = await response.json();
			return NextResponse.json(
				{ errorMessage: errorResponse.errorMessage || '상품 수수료 업데이트에 실패했습니다.' },
				{ status: response.status },
			);
		}

		const { data: updatedProductId } = await response.json();
		return NextResponse.json({ productId: updatedProductId });
	} catch (error) {
		return NextResponse.json(
			{ errorMessage: '상품 수수료 업데이트 중 오류가 발생했습니다.' },
			{ status: 500 },
		);
	}
}
