import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { ErrorResponse } from '@/models/error';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);

		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/user/list?${searchParams.toString()}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);

		if (!response.ok) {
			const errorResponse: ErrorResponse = await response.json();
			return NextResponse.json(
				{ errorMessage: errorResponse.errorMessage || '유저 목록 조회 중 오류가 발생했습니다.' },
				{ status: response.status },
			);
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error('Error fetching user list:', error);
		return NextResponse.json(
			{ errorMessage: '유저 목록 조회 중 오류가 발생했습니다.' },
			{ status: 500 },
		);
	}
}
