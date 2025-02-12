import { fetchApi } from '@/utils/fetchApi';

interface RequestData {
	token_version_id: string;
	enc_data: string;
	integrity_value: string;
}

export const fetchRequestData = async (returnUrl: string): Promise<RequestData> => {
	return fetchApi<RequestData>('/api/niceid/request', {
		method: 'POST',
		token: false,
		body: {
			returnurl: returnUrl,
		},
	});
};
