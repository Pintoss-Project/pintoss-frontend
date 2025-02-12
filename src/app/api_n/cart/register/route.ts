import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
	try {
		const requestBody = await req.json();
		const { userId, cartItems } = requestBody;

		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart/register?userId=${userId}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(cartItems),
			},
		);

		if (!response.ok) {
			const errorResponse = await response.json();
			return NextResponse.json(
				{ errorMessage: errorResponse.errorMessage || '장바구니 추가에 실패했습니다.' },
				{ status: response.status },
			);
		}

		const responseData = await response.json();
		return NextResponse.json(responseData);
	} catch (error) {
		return NextResponse.json(
			{ errorMessage: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
			{ status: 500 },
		);
	}
}
