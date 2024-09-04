import { ErrorResponse } from '@/models/error';
import UserError from '@/utils/error/UserError';

interface CheckPhoneResponse {
	code: number;
	status: string;
	message: string;
	data: boolean;
}

export const getCheckPhoneResult = async (phone: string): Promise<CheckPhoneResponse> => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/check-phone?phone=${phone}`,
	);

	if (!response.ok) {
		const errorResponse: ErrorResponse = await response.json();
		throw new UserError(
			errorResponse.errorMessage || '휴대폰 중복체크에 실패했습니다.',
			errorResponse,
		);
	}

	return response.json();
};
