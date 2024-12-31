import { LoginResponse } from '@/models/user';
import { fetchApi } from '@/utils/fetchApi';
import { LogInFormData } from '@/utils/validation/auth';

export const fetchLogin = async (data: LogInFormData) => {
	return fetchApi<LoginResponse>('/api/auth/login', {
		method: 'POST',
		body: data,
	});
};
