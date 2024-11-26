import { getLocalToken } from './localToken';

export interface FetchApiOptions<TBody = unknown> {
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
	token?: boolean;
	body?: TBody;
	headers?: HeadersInit;
}

export const fetchApi = async <TResponse, TBody = unknown>(
	url: string,
	options: FetchApiOptions<TBody> = {},
): Promise<TResponse> => {
	const { method = 'GET', token, body, headers = {} } = options;

	const authToken = getLocalToken();

	const combinedHeaders: Record<string, string> = {
		'Content-Type': 'application/json',
		...(headers as Record<string, string>),
	};

	if (token && authToken) {
		combinedHeaders['Authorization'] = `bearer ${authToken}`;
	}

	const response = await fetch(url, {
		method,
		headers: combinedHeaders,
		body: body ? JSON.stringify(body) : undefined,
	});

	if (!response.ok) {
		const errorData: unknown = await response.json();
		if (typeof errorData === 'object' && errorData !== null && 'message' in errorData) {
			throw new Error(
				(errorData as { message: string }).message || '요청 처리 중 오류가 발생했습니다.',
			);
		}
		throw new Error('요청 처리 중 오류가 발생했습니다.');
	}

	return response.json() as Promise<TResponse>;
};
