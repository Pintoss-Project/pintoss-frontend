import { CheckPhoneResponse } from '@/models/user';
import { fetchApi } from '@/utils/fetchApi';

export const fetchCheckPhone = async (phone: string): Promise<CheckPhoneResponse> => {
	return fetchApi<CheckPhoneResponse>(`/api/auth/check_phone?phone=${phone}`, {
		method: 'GET',
		token: false,
	});
};
