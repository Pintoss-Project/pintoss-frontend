import { ErrorResponse } from '@/models/error';
import { ProductInfo } from '@/models/product';
import ProductError from '@/utils/error/ProductError';

interface ProductResponse {
	code: number;
	status: string;
	message: string;
	data: ProductInfo;
}

export const getProduct = async (id: number): Promise<ProductResponse> => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/product/${id}`);

	if (!response.ok) {
		const errorResponse: ErrorResponse = await response.json();
		throw new ProductError(
			errorResponse.errorMessage || '상품권 정보을 가져오는 데 실패했습니다.',
			errorResponse,
		);
	}

	return response.json();
};
