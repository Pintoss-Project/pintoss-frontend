import { ErrorResponse } from '@/models/error';
import ProductError from '@/utils/error/ProductError';

export interface UpdateStockParams {
	productId: number;
	categoryId: number;
	data: number;
}

export const updateStock = async ({ productId, categoryId, data }: UpdateStockParams) => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/product/${productId}/category/${categoryId}/stock`,
		{
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		},
	);

	if (!response.ok) {
		const errorResponse: ErrorResponse = await response.json();
		throw new ProductError(
			errorResponse.errorMessage || '재고 업데이트에 실패했습니다.',
			errorResponse,
		);
	}

	return response.json();
};
