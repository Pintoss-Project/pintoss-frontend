export interface FetchApiOptions<TBody = unknown> {
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
	token?: boolean; // 쿠키 방식에서도 옵션으로 유지
	body?: TBody;
	headers?: HeadersInit;
}

export const fetchApi = async <TResponse, TBody = unknown>(
	url: string,
	options: FetchApiOptions<TBody> = {},
): Promise<TResponse> => {
	const { method = 'GET', token, body, headers = {} } = options;

	const combinedHeaders: Record<string, string> = {
		'Access-Control-Allow-Origin': '*', // 모든 Origin 허용
		'Content-Type': 'application/json',
		...(headers as Record<string, string>),
	};

	// 쿠키를 포함하도록 credentials 설정
	const response = await fetch(url, {
		method,
		headers: combinedHeaders,
		body: body ? JSON.stringify(body) : undefined,
		credentials: 'include', // 쿠키를 요청에 포함
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
