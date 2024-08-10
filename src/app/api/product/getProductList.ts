import { BoardInfo } from '@/models/board';
import { ErrorResponse } from '@/models/error';
import { ProductInfo } from '@/models/product';
import ProductError from '@/utils/error/ProductError';

interface ProductListResponse {
	code: number;
	status: string;
	message: string;
	data: ProductInfo[];
}

export const getProductList = async (): Promise<ProductListResponse> => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/product`);

	if (!response.ok) {
		const errorResponse: ErrorResponse = await response.json();
		throw new ProductError(
			errorResponse.errorMessage || '상품권 목록을 가져오는 데 실패했습니다.',
			errorResponse,
		);
	}

	return response.json();
};
