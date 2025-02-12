import { PriceCategoryInfo } from '@/models/product';
import { fetchApi } from '@/utils/fetchApi';
import ProductError from '@/utils/error/ProductError';
import { ErrorResponse } from '@/models/error';

interface PriceCategoryListResponse {
	code: number;
	status: string;
	message: string;
	data: PriceCategoryInfo[];
}

export const fetchPriceCategoryList = async (id: number): Promise<PriceCategoryListResponse> => {
	return fetchApi<PriceCategoryListResponse>(`/api/product/price_category/list?id=${id}`, {
		method: 'GET',
		token: false,
	}).catch((errorResponse: ErrorResponse) => {
		throw new ProductError(
			errorResponse.errorMessage || '가격 카테고리 목록을 가져오는 데 실패했습니다.',
			errorResponse,
		);
	});
};
