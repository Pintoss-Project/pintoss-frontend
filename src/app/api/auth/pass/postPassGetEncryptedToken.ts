import { ErrorResponse } from '@/models/error';
import UserError from '@/utils/error/UserError';

export const postPassGetEncryptedToken = async (accessToken: string) => {
	const clientId = process.env.NEXT_PUBLIC_NICE_CLIENT_ID;
	const productId = process.env.NEXT_PUBLIC_PRODUCT_ID; // productID를 별도 변수로 할당
	const timestamp = Math.floor(new Date().getTime() / 1000);
	const base64Auth = btoa(`${accessToken}:${timestamp}:${clientId}`);

	const dataBody = {
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

	try {
		const headers: HeadersInit = {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${base64Auth}`,
		};

		if (productId) {
			headers['productID'] = productId;
		} else {
			throw new Error('productID가 정의되지 않았습니다.');
		}

		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/digital/niceid/api/v1.0/common/crypto/token`,
			{
				method: 'POST',
				headers: headers,
				body: JSON.stringify(dataBody),
			},
		);

		if (!response.ok) {
			const errorResponse: ErrorResponse = await response.json();
			throw new UserError(
				errorResponse.errorMessage || '암호화 토큰 요청에 실패했습니다.',
				errorResponse,
			);
		}

		const data = await response.json();
		return data.dataBody;
	} catch (error) {
		console.error('Error fetching encrypted token:', error);
		throw new Error('암호화 토큰을 가져오는 중 문제가 발생했습니다.');
	}
};
