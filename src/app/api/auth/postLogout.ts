import { ErrorResponse } from '@/models/error';
import UserError from '@/utils/error/UserError';

export const postLogout = async () => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/logout`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		credentials: 'include',
	});

	if (!response.ok) {
		const errorResponse: ErrorResponse = await response.json();
		throw new UserError(errorResponse.errorMessage || '로그아웃에 실패했습니다.', errorResponse);
	}

	return response.json();
};
