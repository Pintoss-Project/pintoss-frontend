import { ErrorResponse } from '@/models/error';
import { PriceCategoryInfo } from '@/models/product';
import ProductError from '@/utils/error/ProductError';

interface PriceCategoryListResponse {
	code: number;
	status: string;
	message: string;
	data: PriceCategoryInfo[];
}

export const getPriceCategoryList = async (id: number): Promise<PriceCategoryListResponse> => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/product/${id}/category`,
	);

	if (!response.ok) {
		const errorResponse: ErrorResponse = await response.json();
		throw new ProductError(
			errorResponse.errorMessage || '가격 카테고리 목록을 가져오는 데 실패했습니다.',
			errorResponse,
		);
	}

	return response.json();
};
