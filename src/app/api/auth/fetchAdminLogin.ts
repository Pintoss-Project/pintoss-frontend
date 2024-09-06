import { LogInFormData } from '@/utils/validation/auth';
import { fetchApi } from '@/utils/fetchApi';

export const fetchAdminLogin = async (data: LogInFormData): Promise<{ accessToken: string }> => {
	return fetchApi<{ accessToken: string }>('/api/auth/admin_login', {
		method: 'POST',
		token: false,
		body: data,
	});
};
