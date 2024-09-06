import { fetchApi } from '@/utils/fetchApi';
import { ErrorResponse } from '@/models/error';
import CartError from '@/utils/error/CartError';
import { CartItem } from '@/models/cart';

interface CartItemResponse {
	code: number;
	status: string;
	message: string;
	data: number;
}

export const fetchRegisterCartItem = async (
	userId: number,
	data: CartItem,
): Promise<CartItemResponse> => {
	const { productId, ...restData } = data;

	try {
		return await fetchApi<CartItemResponse>(`/api/cart/register?userId=${userId}`, {
			method: 'POST',
			body: {
				productId,
				...restData,
			},
			token: true,
		});
	} catch (error) {
		const errorResponse = error as ErrorResponse;
		throw new CartError(
			errorResponse.errorMessage || '장바구니 추가에 실패했습니다.',
			errorResponse,
		);
	}
};
