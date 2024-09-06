import { ManageUserInfoResponse } from '@/models/user';
import { fetchApi } from '@/utils/fetchApi';

export interface UserListParams {
	startDate?: string;
	endDate?: string;
	search?: string;
	page?: number;
	pageSize?: number;
}

export const fetchUserList = async (params?: UserListParams): Promise<ManageUserInfoResponse> => {
	const queryString = params
		? new URLSearchParams(
				Object.entries(params).reduce((acc, [key, value]) => {
					if (value !== undefined) {
						acc[key] = String(value);
					}
					return acc;
				}, {} as Record<string, string>),
		  ).toString()
		: '';

	const url = `/api/user/list${queryString ? `?${queryString}` : ''}`;

	return fetchApi(url, {
		method: 'GET',
		token: false,
	});
};
