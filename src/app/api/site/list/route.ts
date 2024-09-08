import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/site-info`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			const errorResponse = await response.json();
			return NextResponse.json(
				{
					errorMessage:
						errorResponse.errorMessage || '사이트 정보 리스트를 불러오는데 실패했습니다.',
				},
				{ status: response.status },
			);
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error('Error fetching site info list:', error);
		return NextResponse.json(
			{ errorMessage: '사이트 정보 리스트를 불러오는 중 오류가 발생했습니다.' },
			{ status: 500 },
		);
	}
}
