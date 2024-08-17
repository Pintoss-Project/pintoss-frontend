import { ErrorResponse } from '@/models/error';
import UserError from '@/utils/error/UserError';

export const getOAuthConnectUrl = async (type: string) => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/oauth/${type}/connect`);

	if (!response.ok) {
		const errorResponse: ErrorResponse = await response.json();
		throw new UserError(
			errorResponse.errorMessage || `${type} 계정 연동 리다이렉트 URL을 가져오는 데 실패했습니다.`,
			errorResponse,
		);
	}

	return response.json();
};
