import { ProductInfo } from '@/models/product';
import { fetchApi } from '@/utils/fetchApi';
import ProductError from '@/utils/error/ProductError';
import { ErrorResponse } from '@/models/error';

interface ProductListResponse {
	code: number;
	status: string;
	message: string;
	data: ProductInfo[];
}

export const fetchProductList = async (category?: string): Promise<ProductListResponse> => {
	let url = `/api/product/list`;

	if (category && category !== 'ALL') {
		url += `?category=${encodeURIComponent(category)}`;
	}

	return fetchApi<ProductListResponse>(url, {
		method: 'GET',
		token: false,
	}).catch((errorResponse: ErrorResponse) => {
		throw new ProductError(
			errorResponse.errorMessage || '상품 목록을 가져오는 데 실패했습니다.',
			errorResponse,
		);
	});
};
