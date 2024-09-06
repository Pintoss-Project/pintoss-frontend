import { NextRequest, NextResponse } from 'next/server';
import { ErrorResponse } from '@/models/error';

export async function POST(req: NextRequest) {
	try {
		const { email, password, name, phone } = await req.json();

		const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
				name,
				phone,
			}),
		});

		if (!response.ok) {
			const errorResponse: ErrorResponse = await response.json();
			return NextResponse.json(
				{ errorMessage: errorResponse.errorMessage || '회원가입에 실패했습니다.' },
				{ status: response.status },
			);
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error('Error during registration:', error);
		return NextResponse.json(
			{ errorMessage: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
			{ status: 500 },
		);
	}
}
