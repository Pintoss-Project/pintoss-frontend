import { ErrorResponse } from '@/models/error';
import CartError from '@/utils/error/CartError';
import { CartItem } from '@/models/cart';

export const postCartItem = async (productId: number, userId: number, data: CartItem) => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart/${productId}?userId=${userId}`,
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		},
	);

	if (!response.ok) {
		const errorResponse: ErrorResponse = await response.json();
		throw new CartError(
			errorResponse.errorMessage || '장바구니 추가에 실패했습니다.',
			errorResponse,
		);
	}

	return response.json();
};
