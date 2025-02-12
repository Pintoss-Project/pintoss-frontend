import { fetchApi } from '@/utils/fetchApi';
import { ErrorResponse } from '@/models/error';
import ProductError from '@/utils/error/ProductError';
import { ProductInfoFormData } from '@/utils/validation/product';

export const fetchUpdateProduct = async (
	productId: number,
	data: ProductInfoFormData,
): Promise<void> => {
	return fetchApi<void>(`/api/product/update?productId=${productId}`, {
		method: 'PATCH',
		body: data,
		token: false,
	}).catch((errorResponse: ErrorResponse) => {
		throw new ProductError(
			errorResponse.errorMessage || '상품 업데이트에 실패했습니다.',
			errorResponse,
		);
	});
};
