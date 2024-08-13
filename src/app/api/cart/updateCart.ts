import { ErrorResponse } from '@/models/error';
import CartError from '@/utils/error/CartError';

export const updateCart = async (id: number, data: number) => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart/${id}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		const errorResponse: ErrorResponse = await response.json();
		throw new CartError(
			errorResponse.errorMessage || '장바구니 수량 업데이트에 실패했습니다.',
			errorResponse,
		);
	}

	return response.json();
};
