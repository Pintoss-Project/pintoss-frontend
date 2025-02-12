import { fetchApi } from '@/utils/fetchApi';
import { ErrorResponse } from '@/models/error';
import CartError from '@/utils/error/CartError';

export const fetchDeleteCartItemList = async (userId: number): Promise<void> => {
	try {
		return await fetchApi<void>(`/api/cart/list/delete?userId=${userId}`, {
			method: 'DELETE',
			token: true,
		});
	} catch (error) {
		const errorResponse = error as ErrorResponse;
		throw new CartError(errorResponse.errorMessage || '장바구니 리스트 삭제 실패', errorResponse);
	}
};
