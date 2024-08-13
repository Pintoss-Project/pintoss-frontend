import { ErrorResponse } from '@/models/error';
import CartError from '@/utils/error/CartError';

export const deleteCartItem = async (id: number): Promise<void> => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (!response.ok) {
		const errorResponse: ErrorResponse = await response.json();
		throw new CartError('장바구니 아이템 삭제 실패', errorResponse);
	}
};

export const deleteCartItemList = async (userId: number): Promise<void> => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart/all?userId=${userId}`,
		{
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		},
	);

	if (!response.ok) {
		const errorResponse: ErrorResponse = await response.json();
		throw new CartError('장바구니 리스트 삭제 실패', errorResponse);
	}
};
