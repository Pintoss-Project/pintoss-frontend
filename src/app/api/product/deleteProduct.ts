import { ErrorResponse } from '@/models/error';
import ProductError from '@/utils/error/ProductError';

export const deleteProduct = async (productId: number): Promise<void> => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/product/${productId}`,
		{
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		},
	);

	if (!response.ok) {
		const errorResponse: ErrorResponse = await response.json();
		throw new ProductError('상품권 삭제 실패', errorResponse);
	}
};
