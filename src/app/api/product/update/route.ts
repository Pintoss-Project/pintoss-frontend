import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function PATCH(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);
		const productId = searchParams.get('productId');

		if (!productId) {
			return NextResponse.json({ errorMessage: '상품 ID가 제공되지 않았습니다.' }, { status: 400 });
		}

		const productData = await req.json();

		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/product/${productId}`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(productData),
			},
		);

		if (!response.ok) {
			const errorResponse = await response.json();
			return NextResponse.json(
				{ errorMessage: errorResponse.errorMessage || '상품 업데이트에 실패했습니다.' },
				{ status: response.status },
			);
		}

		const updatedProduct = await response.json();
		return NextResponse.json(updatedProduct);
	} catch (error) {
		return NextResponse.json(
			{ errorMessage: '상품 업데이트 중 오류가 발생했습니다.' },
			{ status: 500 },
		);
	}
}
