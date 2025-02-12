import { fetchApi } from '@/utils/fetchApi';

export const fetchLogout = async () => {
	return fetchApi('/api/auth/logout', {
		method: 'POST',
		token: false,
	});
};
