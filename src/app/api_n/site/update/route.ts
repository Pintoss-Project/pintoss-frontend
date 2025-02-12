import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function PATCH(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);
		const id = searchParams.get('id');

		if (!id) {
			return NextResponse.json(
				{ errorMessage: '사이트 ID가 제공되지 않았습니다.' },
				{ status: 400 },
			);
		}

		const data = await req.json();

		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/site-info/${id}`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			},
		);

		if (!response.ok) {
			const errorResponse = await response.json();
			return NextResponse.json(
				{ errorMessage: errorResponse.errorMessage || '사이트 정보 업데이트에 실패했습니다.' },
				{ status: response.status },
			);
		}

		return NextResponse.json({ message: '사이트 정보가 성공적으로 업데이트되었습니다.' });
	} catch (error) {
		console.error('Error updating site info:', error);
		return NextResponse.json(
			{ errorMessage: '사이트 정보 업데이트 중 오류가 발생했습니다.' },
			{ status: 500 },
		);
	}
}
