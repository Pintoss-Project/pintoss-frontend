import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function PATCH(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);
		const userId = searchParams.get('userId');
		const newPayMethod = searchParams.get('newPayMethod');

		if (!userId || !newPayMethod) {
			return NextResponse.json(
				{ errorMessage: '유저 ID 또는 결제 수단 정보가 제공되지 않았습니다.' },
				{ status: 400 },
			);
		}

		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart/update-paymethod?userId=${userId}&newPayMethod=${newPayMethod}`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);

		if (!response.ok) {
			const errorResponse = await response.json();
			return NextResponse.json(
				{
					errorMessage: errorResponse.errorMessage || '장바구니 결제 수단 업데이트에 실패했습니다.',
				},
				{ status: response.status },
			);
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error('장바구니 결제 수단 업데이트 중 오류 발생:', error);
		return NextResponse.json(
			{ errorMessage: '장바구니 결제 수단 업데이트 중 오류가 발생했습니다.' },
			{ status: 500 },
		);
	}
}
