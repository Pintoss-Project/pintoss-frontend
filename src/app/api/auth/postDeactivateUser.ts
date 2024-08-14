import { ErrorResponse } from '@/models/error';
import UserError from '@/utils/error/UserError';
import { getLocalToken } from '@/utils/localToken';

export const postDeactivateUser = async () => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/deactivate`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `bearer ${getLocalToken()}`,
		},
	});

	if (!response.ok) {
		const errorResponse: ErrorResponse = await response.json();
		throw new UserError(errorResponse.errorMessage || '회원탈퇴에 실패했습니다.', errorResponse);
	}

	return response.json();
};
