import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	try {
		const token = req.headers.get('Authorization')?.split(' ')[1];

		const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/deactivate`, {
			method: 'POST',
			headers: {
				'Authorization': `bearer ${token}`,
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			const errorResponse = await response.json();
			return NextResponse.json(
				{ errorMessage: errorResponse.errorMessage || '회원탈퇴에 실패했습니다.' },
				{ status: response.status },
			);
		}

		return NextResponse.json({ message: '회원탈퇴 성공' });
	} catch (error) {
		console.error('회원탈퇴 요청 중 오류 발생:', error);
		return NextResponse.json(
			{ errorMessage: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
			{ status: 500 },
		);
	}
}
