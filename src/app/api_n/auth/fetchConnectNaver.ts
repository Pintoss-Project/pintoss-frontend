import { fetchApi } from '@/utils/fetchApi';

interface Props {
	code: string;
	state: string;
}

export const fetchConnectNaver = async ({ code, state }: Props) => {
	return fetchApi('/api/auth/connect_naver', {
		method: 'POST',
		token: true,
		body: { code, state },
	});
};
