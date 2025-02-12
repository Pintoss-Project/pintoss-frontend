import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function DELETE(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);
		const id = searchParams.get('id');

		if (!id) {
			return NextResponse.json(
				{ errorMessage: '아이템 ID가 제공되지 않았습니다.' },
				{ status: 400 },
			);
		}

		const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			const errorResponse = await response.json();
			return NextResponse.json(
				{ errorMessage: errorResponse.errorMessage || '장바구니 아이템 삭제 실패' },
				{ status: response.status },
			);
		}

		return NextResponse.json({ message: '장바구니 아이템이 성공적으로 삭제되었습니다.' });
	} catch (error) {
		console.error('장바구니 아이템 삭제 중 오류 발생:', error);
		return NextResponse.json(
			{ errorMessage: '장바구니 아이템 삭제 중 오류가 발생했습니다.' },
			{ status: 500 },
		);
	}
}
