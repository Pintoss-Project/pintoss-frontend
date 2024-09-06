import { PriceCategoryInfoFormData } from '@/utils/validation/product';
import { fetchApi } from '@/utils/fetchApi';
import ProductError from '@/utils/error/ProductError';
import { ErrorResponse } from '@/models/error';

export const fetchRegisterPriceCategory = async (
	id: number,
	data: PriceCategoryInfoFormData[],
): Promise<void> => {
	const requestBody = data.map((category) => ({
		productId: id,
		stock: 1,
		...category,
	}));

	return fetchApi<void>(`/api/product/price_category/register`, {
		method: 'POST',
		body: requestBody,
		token: false,
	}).catch((errorResponse: ErrorResponse) => {
		throw new ProductError(
			errorResponse.errorMessage || '상품권 가격 카테고리 생성에 실패했습니다.',
			errorResponse,
		);
	});
};
