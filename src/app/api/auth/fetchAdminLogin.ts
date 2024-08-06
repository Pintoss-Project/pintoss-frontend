import LoginError from '@/utils/error/LoginError';
import { LogInFormData } from '@/utils/validation/auth';
import { ErrorResponse } from '@/models/error';

export const fetchAdminLogin = async (data: LogInFormData): Promise<{ accessToken: string }> => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		const errorResponse: ErrorResponse = await response.json();
		throw new LoginError('로그인 실패', errorResponse);
	}

	return response.json();
};
