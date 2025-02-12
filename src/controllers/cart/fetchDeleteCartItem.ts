import { fetchApi } from '@/utils/fetchApi';
import { ErrorResponse } from '@/models/error';
import CartError from '@/utils/error/CartError';

export const fetchDeleteCartItem = async (id: number): Promise<void> => {
	return fetchApi<void>(`/api/cart/delete?id=${id}`, {
		method: 'DELETE',
		token: true,
	}).catch((errorResponse) => {
		const error = errorResponse as ErrorResponse;
		throw new CartError(error.errorMessage || '장바구니 아이템 삭제 실패', error);
	});
};
