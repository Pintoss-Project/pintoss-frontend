import { LoginResponse } from '@/models/user';
import { fetchApi } from '@/utils/fetchApi';
import { LogInFormData } from '@/utils/validation/auth';

export const fetchLogin = async (data: LogInFormData) => {
	return fetchApi<LoginResponse>('/api/auth/admin_login', {
		method: 'POST',
		token: false,
		body: data,
	});
};
