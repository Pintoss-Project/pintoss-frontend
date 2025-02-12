import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);
		const id = searchParams.get('id');

		if (!id) {
			return NextResponse.json(
				{ errorMessage: '상품권 ID가 제공되지 않았습니다.' },
				{ status: 400 },
			);
		}

		const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/product/${id}`);

		if (!response.ok) {
			const errorResponse = await response.json();
			return NextResponse.json(
				{ errorMessage: errorResponse.errorMessage || '상품권 정보를 가져오는 데 실패했습니다.' },
				{ status: response.status },
			);
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		return NextResponse.json(
			{ errorMessage: '상품권 정보를 가져오는 중 오류가 발생했습니다.' },
			{ status: 500 },
		);
	}
}
