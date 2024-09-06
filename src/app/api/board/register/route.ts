import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
	try {
		const { type, ...data } = await req.json();

		const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/board`, {
			method: 'POST',
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
				{ errorMessage: errorResponse.errorMessage || '게시판 생성에 실패했습니다.' },
				{ status: response.status },
			);
		}

		const responseData = await response.json();
		return NextResponse.json(responseData);
	} catch (error) {
		console.error('Error creating board:', error);
		return NextResponse.json(
			{ errorMessage: '게시판 생성 중 오류가 발생했습니다.' },
			{ status: 500 },
		);
	}
}
