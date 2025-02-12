import { FindIdResponse } from '@/models/user';
import { fetchApi } from '@/utils/fetchApi';

export const fetchFindId = async (name: string, phone: string) => {
	return fetchApi<FindIdResponse>(`/api/auth/find_id?name=${name}&phone=${phone}`, {
		method: 'GET',
	});
};
