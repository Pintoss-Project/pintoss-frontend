import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function DELETE(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);
		const id = searchParams.get('id');

		if (!id) {
			return NextResponse.json({ errorMessage: '배너 ID가 제공되지 않았습니다.' }, { status: 400 });
		}

		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/site-banner/${id}`,
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);

		if (!response.ok) {
			const errorResponse = await response.json();
			return NextResponse.json(
				{ errorMessage: errorResponse.errorMessage || '배너 삭제에 실패했습니다.' },
				{ status: response.status },
			);
		}

		return NextResponse.json({ message: '배너 삭제 성공' });
	} catch (error) {
		console.error('Error deleting banner:', error);
		return NextResponse.json(
			{ errorMessage: '배너 삭제 중 오류가 발생했습니다.' },
			{ status: 500 },
		);
	}
}
