import { fetchApi } from '@/utils/fetchApi';
import ProductError from '@/utils/error/ProductError';
import { ErrorResponse } from '@/models/error';
import { SimpleProductInfo } from '@/models/product';

interface SimpleProductInfoResponse {
	code: number;
	status: string;
	message: string;
	data: SimpleProductInfo[];
}

export const fetchSimpleProductList = async (
	category?: string,
): Promise<SimpleProductInfoResponse> => {
	let url = `/api/product/simple`;

	if (category && category !== 'ALL') {
		url += `?category=${encodeURIComponent(category)}`;
	}

	return fetchApi<SimpleProductInfoResponse>(url, {
		method: 'GET',
		token: false,
	}).catch((errorResponse: ErrorResponse) => {
		throw new ProductError(
			errorResponse.errorMessage || '상품 목록을 가져오는 데 실패했습니다.',
			errorResponse,
		);
	});
};
