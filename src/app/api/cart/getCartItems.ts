import { CartItemResponse } from '@/models/cart';
import { ErrorResponse } from '@/models/error';
import CartError from '@/utils/error/CartError';

interface CartItemsResponse {
	code: number;
	status: string;
	message: string;
	data: CartItemResponse[];
}

export const getCartItems = async (id: number): Promise<CartItemsResponse> => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart?userId=${id}`);

	if (!response.ok) {
		const errorResponse: ErrorResponse = await response.json();
		throw new CartError(
			errorResponse.errorMessage || '장바구니 아이템 목록을 가져오는 데 실패했습니다.',
			errorResponse,
		);
	}

	return response.json();
};
