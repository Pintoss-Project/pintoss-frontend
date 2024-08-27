import { NextResponse } from 'next/server';

interface EncryptedTokenRequestBody {
	accessToken: string;
	timestamp: number;
	clientId: string;
}

export async function POST(request: Request) {
	const { accessToken, timestamp, clientId }: EncryptedTokenRequestBody = await request.json();

	const base64Auth = Buffer.from(`${accessToken}:${timestamp}:${clientId}`).toString('base64');

	const body = {
		dataHeader: { CNTY_CD: 'ko' },
		dataBody: {
			req_dtim: new Date().toISOString().substring(0, 19).replace(/[\D]/g, ''),
			req_no:
				'REQ' +
				new Date().toISOString().substring(0, 19).replace(/[\D]/g, '') +
				String(Math.floor(Math.random() * 9999)).padStart(4, '0'),
			enc_mode: '1',
		},
	};

	const headers = new Headers({
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${base64Auth}`,
	});

	if (process.env.NEXT_PUBLIC_PRODUCT_ID) {
		headers.append('productID', process.env.NEXT_PUBLIC_PRODUCT_ID);
	}

	try {
		const response = await fetch(
			'https://svc.niceapi.co.kr:22001/digital/niceid/api/v1.0/common/crypto/token',
			{
				method: 'POST',
				headers: headers,
				body: JSON.stringify(body),
			},
		);

		if (!response.ok) {
			const errorText = await response.text();
			return NextResponse.json({ error: errorText }, { status: response.status });
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error('Error fetching encrypted token:', error);
		return NextResponse.json(
			{ error: '서버에서 암호화된 토큰을 가져오는 중 문제가 발생했습니다.' },
			{ status: 500 },
		);
	}
}
