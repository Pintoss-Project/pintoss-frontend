import { fetchApi } from '@/utils/fetchApi';
import { ErrorResponse } from '@/models/error';
import CartError from '@/utils/error/CartError';

export const fetchUpdateCartItem = async (id: number, quantity: number) => {
	try {
		return await fetchApi<void>(`/api/cart/update?id=${id}`, {
			method: 'PATCH',
			body: { quantity },
			token: true,
		});
	} catch (error) {
		const errorResponse = error as ErrorResponse;
		throw new CartError(
			errorResponse.errorMessage || '장바구니 수량 업데이트에 실패했습니다.',
			errorResponse,
		);
	}
};
