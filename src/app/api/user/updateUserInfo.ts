import { ErrorResponse } from '@/models/error';
import { OAuthUserRequest } from '@/models/user';
import UserError from '@/utils/error/UserError';
import { getLocalToken } from '@/utils/localToken';

export const updateUserInfo = async (data: OAuthUserRequest) => {
	const token = getLocalToken();
	const { email, name, phone, inflow } = data;

	const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/update`, {
		method: 'PATCH',
		headers: {
			'Authorization': `bearer ${token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email,
			name,
			phone,
			inflow,
		}),
	});

	if (!response.ok) {
		const errorResponse: ErrorResponse = await response.json();
		throw new UserError(
			errorResponse.errorMessage || '유저 정보 업데이트에 실패했습니다.',
			errorResponse,
		);
	}

	return response.json();
};
