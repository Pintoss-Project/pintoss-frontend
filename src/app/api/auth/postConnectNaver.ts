import { ErrorResponse } from '@/models/error';
import UserError from '@/utils/error/UserError';
import { getLocalToken } from '@/utils/localToken';

interface Props {
	code: string;
	state: string;
}

export const postConnectNaver = async ({ code, state }: Props) => {
	const token = getLocalToken();

	const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/oauth/naver/callback`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `bearer ${token}`,
		},
		body: JSON.stringify({ code, state }),
	});

	if (!response.ok) {
		const errorResponse: ErrorResponse = await response.json();
		throw new UserError(
			errorResponse.errorMessage || '네이버 계정 연동에 실패했습니다.',
			errorResponse,
		);
	}

	return response.json();
};
