import { ErrorResponse } from '@/models/error';
import UserError from '@/utils/error/UserError';
import { RegisterFormData } from '@/utils/validation/auth';

export const postRegister = async (data: RegisterFormData) => {
	const { email, password, name, phone } = data;

	const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/register`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			email,
			password,
			name,
			phone,
		}),
	});

	if (!response.ok) {
		const errorResponse: ErrorResponse = await response.json();
		throw new UserError(errorResponse.errorMessage || '회원가입에 실패했습니다.', errorResponse);
	}

	return response.json();
};
