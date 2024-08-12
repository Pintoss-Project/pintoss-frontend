import { ErrorResponse } from '@/models/error';
import { ProductInfo, SimpleProductInfo } from '@/models/product';
import ProductError from '@/utils/error/ProductError';

interface ProductListResponse {
	code: number;
	status: string;
	message: string;
	data: ProductInfo[];
}

interface SimpleProductInfoResponse {
	code: number;
	status: string;
	message: string;
	data: SimpleProductInfo[];
}

export const getProductList = async (category?: string): Promise<ProductListResponse> => {
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

export const getPopularProduct = async (): Promise<SimpleProductInfoResponse> => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/product/popular`);

	if (!response.ok) {
		const errorResponse: ErrorResponse = await response.json();
		throw new ProductError(
			errorResponse.errorMessage || '상품권 목록을 가져오는 데 실패했습니다.',
			errorResponse,
		);
	}

	return response.json();
};

export const getSimpleProductList = async (
	category?: string,
): Promise<SimpleProductInfoResponse> => {
	let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/product/simple`;

	if (category && category !== 'ALL') {
		url += `?category=${encodeURIComponent(category)}`;
	}

	const response = await fetch(url);

	if (!response.ok) {
		const errorResponse: ErrorResponse = await response.json();
		throw new ProductError(
			errorResponse.errorMessage || '상품권 목록을 가져오는 데 실패했습니다.',
			errorResponse,
		);
	}

	return response.json();
};
