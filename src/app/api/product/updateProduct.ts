import { ErrorResponse } from '@/models/error';
import ProductError from '@/utils/error/ProductError';
import { ProductInfoFormData } from '@/utils/validation/product';

export const updateProduct = async (productId: number, data: ProductInfoFormData) => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/product/${productId}`,
		{
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		},
	);

	if (!response.ok) {
		const errorResponse: ErrorResponse = await response.json();
		throw new ProductError(
			errorResponse.errorMessage || '상품 업데이트에 실패했습니다.',
			errorResponse,
		);
	}

	return response.json();
};
