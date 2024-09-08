import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
	try {
		const productData = await req.json();

		const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/product`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				isPopular: false,
				cardDiscount: 0,
				phoneDiscount: 0,
				...productData,
			}),
		});

		if (!response.ok) {
			const errorResponse = await response.json();
			return NextResponse.json(
				{ errorMessage: errorResponse.errorMessage || '상품권 생성에 실패했습니다.' },
				{ status: response.status },
			);
		}

		const data = await response.json();

		return NextResponse.json(data);
	} catch (error) {
		return NextResponse.json(
			{ errorMessage: '상품권 생성 중 오류가 발생했습니다.' },
			{ status: 500 },
		);
	}
}
