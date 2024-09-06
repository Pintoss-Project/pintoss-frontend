import { fetchApi } from '@/utils/fetchApi';
import { ErrorResponse } from '@/models/error';
import ProductError from '@/utils/error/ProductError';

export const fetchDeleteProduct = async (productId: number): Promise<void> => {
	return fetchApi<void>(`/api/product/delete?productId=${productId}`, {
		method: 'DELETE',
		token: false,
	}).catch((errorResponse: ErrorResponse) => {
		throw new ProductError(errorResponse.errorMessage || '상품권 삭제 실패', errorResponse);
	});
};
