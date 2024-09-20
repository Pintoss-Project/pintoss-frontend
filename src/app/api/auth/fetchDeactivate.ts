import { fetchApi } from '@/utils/fetchApi';

export const fetchDeactivate = async () => {
	return fetchApi('/api/auth/deactivate', {
		method: 'POST',
		token: true,
	});
};
