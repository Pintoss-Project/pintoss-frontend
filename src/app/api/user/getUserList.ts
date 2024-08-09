import { ErrorResponse } from '@/models/error';
import { ManageUserInfoResponse } from '@/models/user';
import UserError from '@/utils/error/UserError';

export const getUserList = async (params?: {
	startDate?: string;
	endDate?: string;
	search?: string;
	page?: number;
	pageSize?: number;
}): Promise<ManageUserInfoResponse> => {
	const queryString = params ? new URLSearchParams(params as any).toString() : '';
	const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/user/list${
		queryString ? `?${queryString}` : ''
	}`;

	const response = await fetch(url);

	if (!response.ok) {
		const errorResponse: ErrorResponse = await response.json();
		throw new UserError('유저리스트 조회 실패', errorResponse);
	}

	return response.json();
};
