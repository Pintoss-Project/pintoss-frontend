import { ErrorResponse } from '@/models/error';
import CustomError from '@/utils/error/CustomError';

export const getFilteredUserList = async (params: {
	startDate?: string;
	endDate?: string;
	search?: string;
}) => {
	const queryString = new URLSearchParams(params).toString();
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/user/filter?${queryString}`,
	);

	if (!response.ok) {
		const errorResponse: ErrorResponse = await response.json();
		throw new CustomError('필터링된 유저리스트 조회 실패', errorResponse);
	}

	return response.json();
};
