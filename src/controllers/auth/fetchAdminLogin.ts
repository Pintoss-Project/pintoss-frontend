import { LogInFormData } from '@/utils/validation/auth';
import { fetchApi } from '@/utils/fetchApi';

export const fetchAdminLogin = async (
	data: LogInFormData,
): Promise<{ data: { accessToken: string } }> => {
	return fetchApi<{ data: { accessToken: string } }>('/api/auth/login', {
		method: 'POST',
		token: false,
		body: data,
	});
};
