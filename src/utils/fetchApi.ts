// Frontend에서 API 요청을 보내는 fetchApi

export interface FetchApiOptions<TBody = unknown> {
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
	token?: boolean;
	body?: TBody;
	headers?: HeadersInit;
	timeout?: number;
}

interface ApiError {
	message: string;
	status?: number;
}
const env = process.env.NODE_ENV

const API_CONFIG = {
	baseUrl: env == "development" ? 'http://localhost:3000' : process.env.NEXT_PUBLIC_FRONT_URL, // fallback to next.config.js rewrites
	defaultTimeout: 10000, // 10 seconds
	defaultHeaders: {
		'Access-Control-Allow-Origin': '*',
		'no-cors': '',
		'Content-Type': 'application/json',
	},
} as const;

class FetchError extends Error {
	constructor(public status: number, message: string) {
		super(message);
		this.name = 'FetchError';
	}
}

const createUrl = (url: string): string => {
	return url.startsWith('http') ? url : `${API_CONFIG.baseUrl}${url}`;
};

export const fetchApi = async <TResponse, TBody = unknown>(
	url: string,
	options: FetchApiOptions<TBody> = {},
): Promise<TResponse> => {
	const {
		method = 'GET',
		body,
		headers = {},
		timeout = API_CONFIG.defaultTimeout,
		token = false,
	} = options;

	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), timeout);

	try {
		const response = await fetch(createUrl(url), {
			method,
			headers: {
				...API_CONFIG.defaultHeaders, ...headers,
				...(token ? { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, } : {})
			},
			body: body ? JSON.stringify(body) : undefined,
			credentials: 'include',  // This ensures cookie handling
			signal: controller.signal,
		});

		if (!response.ok) {
			const errorData = await response.json().catch(() => null);
			throw new FetchError(
				response.status,
				(errorData as ApiError)?.message || '요청 처리 중 오류가 발생했습니다.'
			);
		}

		return response.json() as Promise<TResponse>;
	} catch (error) {
		if (error instanceof FetchError) {
			throw error;
		}
		if (error instanceof DOMException && error.name === 'AbortError') {
			throw new FetchError(408, '요청 시간이 초과되었습니다.');
		}
		throw new FetchError(500, '네트워크 오류가 발생했습니다.');
	} finally {
		clearTimeout(timeoutId);
	}
};
