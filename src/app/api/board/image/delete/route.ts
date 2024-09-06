import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function DELETE(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);
		const imageId = searchParams.get('imageId');

		if (!imageId) {
			return NextResponse.json({ errorMessage: '유효한 이미지 ID가 필요합니다.' }, { status: 400 });
		}

		const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/images/${imageId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			const errorResponse = await response.json();
			return NextResponse.json(
				{ errorMessage: errorResponse.errorMessage || '이미지 삭제 실패' },
				{ status: response.status },
			);
		}

		return NextResponse.json({ message: '이미지 삭제 성공' });
	} catch (error) {
		console.error('이미지 삭제 중 오류 발생:', error);
		return NextResponse.json(
			{ errorMessage: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
			{ status: 500 },
		);
	}
}
