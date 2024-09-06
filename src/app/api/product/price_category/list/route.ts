import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);
		const productId = searchParams.get('id');

		if (!productId) {
			return NextResponse.json({ errorMessage: '제품 ID가 제공되지 않았습니다.' }, { status: 400 });
		}

		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/product/${productId}/category`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);

		if (!response.ok) {
			const errorResponse = await response.json();
			return NextResponse.json(
				{
					errorMessage:
						errorResponse.errorMessage || '가격 카테고리 목록을 가져오는 데 실패했습니다.',
				},
				{ status: response.status },
			);
		}

		const responseData = await response.json();
		return NextResponse.json(responseData);
	} catch (error) {
		return NextResponse.json(
			{ errorMessage: '가격 카테고리 목록 조회 중 오류가 발생했습니다.' },
			{ status: 500 },
		);
	}
}
