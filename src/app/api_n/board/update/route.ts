import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function PATCH(req: NextRequest) {
	try {
		const { type, ...data } = await req.json();

		const { searchParams } = new URL(req.url);
		const id = searchParams.get('id');

		if (!id) {
			return NextResponse.json(
				{ errorMessage: '게시글 ID가 제공되지 않았습니다.' },
				{ status: 400 },
			);
		}

		const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/board/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				type: type.toUpperCase(),
				writer: '관리자',
				...data,
			}),
		});

		if (!response.ok) {
			const errorResponse = await response.json();
			return NextResponse.json(
				{ errorMessage: errorResponse.errorMessage || '게시글 업데이트에 실패했습니다.' },
				{ status: response.status },
			);
		}

		const responseData = await response.json();
		return NextResponse.json(responseData);
	} catch (error) {
		console.error('Error updating board:', error);
		return NextResponse.json(
			{ errorMessage: '게시글 업데이트 중 오류가 발생했습니다.' },
			{ status: 500 },
		);
	}
}
