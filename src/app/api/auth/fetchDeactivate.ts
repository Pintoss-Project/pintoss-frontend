import { fetchApi } from '@/utils/fetchApi';

export const fetchDeactivate = async () => {
	return fetchApi<void>('/api/auth/deactivate', {
		method: 'POST',
		token: true,
	});
};
