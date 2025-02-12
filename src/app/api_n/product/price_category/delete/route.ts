import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function DELETE(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);
		const productId = searchParams.get('productId');
		const categoryId = searchParams.get('categoryId');

		if (!productId || !categoryId) {
			return NextResponse.json(
				{ errorMessage: '제품 ID 또는 카테고리 ID가 제공되지 않았습니다.' },
				{ status: 400 },
			);
		}

		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/product/${productId}/category/${categoryId}`,
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);

		if (!response.ok) {
			const errorResponse = await response.json();
			return NextResponse.json(
				{ errorMessage: errorResponse.errorMessage || '가격 카테고리 삭제에 실패했습니다.' },
				{ status: response.status },
			);
		}

		return NextResponse.json({ message: '가격 카테고리가 성공적으로 삭제되었습니다.' });
	} catch (error) {
		return NextResponse.json(
			{ errorMessage: '가격 카테고리 삭제 중 오류가 발생했습니다.' },
			{ status: 500 },
		);
	}
}
