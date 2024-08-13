import { ErrorResponse } from '@/models/error';
import UserError from '@/utils/error/UserError';
import { LogInFormData } from '@/utils/validation/auth';

export const postLogin = async (data: LogInFormData) => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		const errorResponse: ErrorResponse = await response.json();
		throw new UserError(errorResponse.errorMessage || '로그인에 실패했습니다.', errorResponse);
	}

	return response.json();
};
