import { PriceCategoryInfo } from '@/models/product';
import { fetchApi } from '@/utils/fetchApi';
import ProductError from '@/utils/error/ProductError';
import { ErrorResponse } from '@/models/error';

interface PriceCategoryResponse {
	code: number;
	status: string;
	message: string;
	data: PriceCategoryInfo;
}

export const fetchPriceCategory = async (
	productId: number,
	categoryId: number,
): Promise<PriceCategoryResponse> => {
	return fetchApi<PriceCategoryResponse>(
		`/api/product/price_category?id=${productId}&categoryId=${categoryId}`,
		{
			method: 'GET',
			token: false,
		},
	).catch((errorResponse: ErrorResponse) => {
		throw new ProductError(
			errorResponse.errorMessage || '가격 카테고리 정보를 가져오는 데 실패했습니다.',
			errorResponse,
		);
	});
};
