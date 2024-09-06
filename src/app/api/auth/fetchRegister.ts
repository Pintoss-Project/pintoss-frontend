import { fetchApi } from '@/utils/fetchApi';
import { RegisterFormData } from '@/utils/validation/auth';

export const fetchRegister = async (data: RegisterFormData) => {
	const response = await fetchApi('/api/auth/register', {
		method: 'POST',
		token: false,
		body: data,
	});

	return response;
};
