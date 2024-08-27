import { ErrorResponse } from '@/models/error';
import UserError from '@/utils/error/UserError';

export const postPassGetAccessToken = async () => {
	const clientId = process.env.NEXT_PUBLIC_NICE_CLIENT_ID;
	const clientSecret = process.env.NEXT_PUBLIC_NICE_CLIENT_SECRET;

	const authorization = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

	const dataBody = new URLSearchParams();
	dataBody.append('grant_type', 'client_credentials');
	dataBody.append('scope', 'default');

	try {
		const response = await fetch(
			`https://svc.niceapi.co.kr:22001/digital/niceid/oauth/oauth/token`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
					'Authorization': `Basic ${authorization}`,
				},
				body: dataBody.toString(),
			},
		);

		if (!response.ok) {
			const errorResponse: ErrorResponse = await response.json();
			throw new UserError(
				errorResponse.errorMessage || '액세스 토큰 요청에 실패했습니다.',
				errorResponse,
			);
		}

		const data = await response.json();

		return data.access_token;
	} catch (error) {
		console.error('Error fetching access token:', error);
		throw new Error('액세스 토큰을 가져오는 중 문제가 발생했습니다.');
	}
};
