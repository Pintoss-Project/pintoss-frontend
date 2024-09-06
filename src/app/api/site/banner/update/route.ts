import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function PATCH(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);
		const id = searchParams.get('id');

		if (!id) {
			return NextResponse.json({ errorMessage: '배너 ID가 제공되지 않았습니다.' }, { status: 400 });
		}

		const bannerData = await req.json();

		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/site-banner/${id}`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(bannerData),
			},
		);

		if (!response.ok) {
			const errorResponse = await response.json();
			return NextResponse.json(
				{ errorMessage: errorResponse.errorMessage || '배너 정보 업데이트에 실패했습니다.' },
				{ status: response.status },
			);
		}

		return NextResponse.json({ message: '배너 정보 업데이트 성공' });
	} catch (error) {
		console.error('Error updating banner:', error);
		return NextResponse.json(
			{ errorMessage: '배너 정보 업데이트 중 오류가 발생했습니다.' },
			{ status: 500 },
		);
	}
}
