import { ProductInfo } from '@/models/product';
import { fetchApi } from '@/utils/fetchApi';
import ProductError from '@/utils/error/ProductError';
import { ErrorResponse } from '@/models/error';

interface ProductResponse {
	code: number;
	status: string;
	message: string;
	data: ProductInfo;
}

export const fetchProductInfo = async (id: number): Promise<ProductResponse> => {
	return fetchApi<ProductResponse>(`/api/product?id=${id}`, {
		method: 'GET',
		token: false,
	}).catch((errorResponse: ErrorResponse) => {
		throw new ProductError(
			errorResponse.errorMessage || '상품권 정보를 가져오는 데 실패했습니다.',
			errorResponse,
		);
	});
};
