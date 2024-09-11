import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);
		const name = searchParams.get('name');
		const phone = searchParams.get('phone');

		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/find-id?name=${name}&phone=${phone}`,
		);

		if (!response.ok) {
			const errorResponse = await response.json();
			return NextResponse.json(
				{ errorMessage: errorResponse.errorMessage || '아이디 찾기에 실패했습니다.' },
				{ status: response.status },
			);
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error('아이디 찾기 요청 중 오류 발생:', error);
		return NextResponse.json(
			{ errorMessage: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
			{ status: 500 },
		);
	}
}
