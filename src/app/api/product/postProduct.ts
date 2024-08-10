import { ErrorResponse } from '@/models/error';
import ProductError from '@/utils/error/ProductError';
import { ProductInfoFormData } from '@/utils/validation/product';

export const postProduct = async (data: ProductInfoFormData) => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/product`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			isPopular: false,
			cardDiscount: 0,
			phoneDiscount: 0,
			...data,
		}),
	});

	if (!response.ok) {
		const errorResponse: ErrorResponse = await response.json();
		throw new ProductError(
			errorResponse.errorMessage || '상품권 생성에 실패했습니다.',
			errorResponse,
		);
	}

	return response.json();
};
