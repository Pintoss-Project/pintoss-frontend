import { ErrorResponse } from '@/models/error';
import ProductError from '@/utils/error/ProductError';
import { PriceCategoryInfoFormData } from '@/utils/validation/product';

export const postPriceCategory = async (id: number, data: PriceCategoryInfoFormData) => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/product/${id}/category`,
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				productId: id,
				stock: 1,
				...data,
			}),
		},
	);

	if (!response.ok) {
		const errorResponse: ErrorResponse = await response.json();
		throw new ProductError(
			errorResponse.errorMessage || '상품권 가격 카테고리 생성에 실패했습니다.',
			errorResponse,
		);
	}

	return await response.json();
};
