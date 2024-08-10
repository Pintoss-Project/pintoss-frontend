import { ErrorResponse } from '@/models/error';
import ProductError from '@/utils/error/ProductError';

export interface FeeData {
	cardDiscount: number | undefined;
	phoneDiscount: number | undefined;
}

export interface UpdateFeeParams {
	productId: number;
	data: FeeData;
}

export const updateFee = async ({ productId, data }: UpdateFeeParams) => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/product/${productId}/fee`,
		{
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		},
	);

	if (!response.ok) {
		const errorResponse: ErrorResponse = await response.json();
		throw new ProductError(
			errorResponse.errorMessage || '상품 수수료 업데이트에 실패했습니다.',
			errorResponse,
		);
	}

	return response.json();
};
