import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);
		const userId = searchParams.get('userId');

		if (!userId) {
			return NextResponse.json(
				{ errorMessage: '사용자 ID가 제공되지 않았습니다.' },
				{ status: 400 },
			);
		}

		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart?userId=${userId}`,
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
						errorResponse.errorMessage || '장바구니 아이템 목록을 가져오는 데 실패했습니다.',
				},
				{ status: response.status },
			);
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error('장바구니 아이템 목록을 가져오는 중 오류 발생:', error);
		return NextResponse.json(
			{ errorMessage: '장바구니 아이템 목록을 가져오는 중 오류가 발생했습니다.' },
			{ status: 500 },
		);
	}
}
