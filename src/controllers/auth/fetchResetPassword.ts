import { fetchApi } from '@/utils/fetchApi';

export const fetchResetPassword = async (
	name: string,
	phone: string,
	newPassword: string,
): Promise<void> => {
	await fetchApi<void>('/api/auth/reset-password', {
		method: 'PATCH',
		token: false,
		body: {
			name,
			phone,
			newPassword,
		},
	});
};
