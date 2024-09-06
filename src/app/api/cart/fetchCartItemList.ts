import { CartItemResponse } from '@/models/cart';
import { ErrorResponse } from '@/models/error';
import CartError from '@/utils/error/CartError';
import { fetchApi } from '@/utils/fetchApi';

export interface CartItemsResponse {
	code: number;
	status: string;
	message: string;
	data: CartItemResponse[];
}

export const fetchCartItemList = async (userId: number): Promise<CartItemsResponse> => {
	try {
		return await fetchApi<CartItemsResponse>(`/api/cart/list?userId=${userId}`, {
			method: 'GET',
			token: true,
		});
	} catch (error) {
		const errorResponse = error as ErrorResponse;
		throw new CartError(
			errorResponse.errorMessage || '장바구니 아이템 목록을 가져오는 데 실패했습니다.',
			errorResponse,
		);
	}
};
