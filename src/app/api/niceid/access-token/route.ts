// app/api/niceid/access-token/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	const clientId = process.env.NEXT_PUBLIC_NICE_CLIENT_ID;
	const clientSecret = process.env.NEXT_PUBLIC_NICE_CLIENT_SECRET;
	const authorization = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

	const body = new URLSearchParams();
	body.append('grant_type', 'client_credentials');
	body.append('scope', 'default');

	try {
		const response = await fetch(
			'https://svc.niceapi.co.kr:22001/digital/niceid/oauth/oauth/token',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
					'Authorization': `Basic ${authorization}`,
				},
				body: body.toString(),
			},
		);

		if (!response.ok) {
			const errorText = await response.text();
			return NextResponse.json({ error: errorText }, { status: response.status });
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error('Error fetching access token:', error);
		return NextResponse.json(
			{ error: '서버에서 액세스 토큰을 가져오는 중 문제가 발생했습니다.' },
			{ status: 500 },
		);
	}
}
