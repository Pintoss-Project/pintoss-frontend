import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
	try {
		const bannerData = await req.json();

		const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/site-banner`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(bannerData),
		});

		if (!response.ok) {
			const errorResponse = await response.json();
			return NextResponse.json(
				{ errorMessage: errorResponse.errorMessage || '배너 등록에 실패했습니다.' },
				{ status: response.status },
			);
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error('Error registering banner:', error);
		return NextResponse.json(
			{ errorMessage: '배너 등록 중 오류가 발생했습니다.' },
			{ status: 500 },
		);
	}
}
