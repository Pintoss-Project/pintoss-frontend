import { NextRequest, NextResponse } from 'next/server';

const JAVA_SERVER_BASE_URL = 'http://pintossmall2.cafe24.com/api/nice/decrypt';

export async function POST(req: NextRequest) {
	try {
		const { token_version_id, enc_data } = await req.json();

		if (!token_version_id || !enc_data) {
			return NextResponse.json({ message: 'Missing required parameters' }, { status: 400 });
		}

		const response = await fetch(JAVA_SERVER_BASE_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				token_version_id,
				enc_data,
			}),
		});

		if (!response.ok) {
			const error = await response.json();
			console.error('Java API error:', error);
			return NextResponse.json(
				{ message: 'Error from Java server', details: error },
				{ status: response.status },
			);
		}

		const decryptedData = await response.json();
		return NextResponse.json(decryptedData, { status: 200 });
	} catch (error: unknown) {
		console.error('Request to Java API failed:', error);
		if (error instanceof Error) {
			return NextResponse.json(
				{ message: 'Internal server error', error: error.message },
				{ status: 500 },
			);
		} else {
			return NextResponse.json(
				{ message: 'Internal server error', error: 'Unknown error occurred' },
				{ status: 500 },
			);
		}
	}
}
