import { ErrorResponse } from '@/models/error';
import UserError from '@/utils/error/UserError';

interface CheckIdResponse {
	code: number;
	status: string;
	message: string;
	data: boolean;
}

export const getCheckIdResult = async (email: string): Promise<CheckIdResponse> => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/check-id?email=${email}`,
	);

	if (!response.ok) {
		const errorResponse: ErrorResponse = await response.json();
		throw new UserError(
			errorResponse.errorMessage || '아이디 중복체크에 실패했습니다.',
			errorResponse,
		);
	}

	return response.json();
};
