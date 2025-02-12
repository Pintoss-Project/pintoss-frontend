import { ErrorResponse } from '@/models/error';
import ProductError from '@/utils/error/ProductError';
import { fetchApi } from '@/utils/fetchApi';

export const fetchDeletePriceCategory = async (
	productId: number,
	categoryId: number,
): Promise<void> => {
	return fetchApi<void>(
		`/api/product/price_category/delete?productId=${productId}&categoryId=${categoryId}`,
		{
			method: 'DELETE',
			token: false,
		},
	).catch((errorResponse: ErrorResponse) => {
		throw new ProductError('가격 카테고리 삭제 실패', errorResponse);
	});
};
