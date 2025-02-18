import { CheckIdResponse } from '@/models/user';
import { fetchApi } from '@/utils/fetchApi';

export const fetchCheckId = async (email: string): Promise<CheckIdResponse> => {
	return fetchApi<CheckIdResponse>(`/api/auth/check-id?email=${email}`, {
		method: 'GET',
		token: false,
	});
};
