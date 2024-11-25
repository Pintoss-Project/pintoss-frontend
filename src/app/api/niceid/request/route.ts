import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

type RequestBody = {
	returnurl: string;
};

export async function POST(req: NextRequest) {
	try {
		const { returnurl } = (await req.json()) as RequestBody;

		const response = await fetch('http://localhost:8080/api/nice/request', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				requestno: 'REQ123456789',
				returnurl,
				authtype: 'M',
				methodtype: 'post',
				popupyn: 'Y',
				receivedata: JSON.stringify({ foo: 'bar' }),
			}),
		});

		if (!response.ok) {
			throw new Error(`Failed to request NICE authentication: ${response.statusText}`);
		}

		const result = await response.json();

		const { token_version_id, enc_data, integrity_value } = result;
		if (!token_version_id || !enc_data || !integrity_value) {
			throw new Error('필수 데이터가 누락되었습니다.');
		}

		return NextResponse.json({
			token_version_id,
			enc_data,
			integrity_value,
		});
	} catch (error) {
		console.error('Error processing NICE authentication request:', error);
		return NextResponse.json(
			{ message: '인증 처리 중 오류가 발생했습니다. 다시 시도해주세요.' },
			{ status: 500 },
		);
	}
}
