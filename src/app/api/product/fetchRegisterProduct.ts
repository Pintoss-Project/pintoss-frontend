import { fetchApi } from '@/utils/fetchApi';
import { ProductInfoFormData } from '@/utils/validation/product';
import { ErrorResponse } from '@/models/error';
import ProductError from '@/utils/error/ProductError';

interface RegisterProductResponse {
	code: number;
	status: string;
	message: string;
	data: number;
}

export const fetchRegisterProduct = async (
	data: ProductInfoFormData,
): Promise<RegisterProductResponse> => {
	return fetchApi<RegisterProductResponse>('/api/product/register', {
		method: 'POST',
		body: {
			isPopular: false,
			cardDiscount: 0,
			phoneDiscount: 0,
			...data,
		},
		token: false,
	}).catch((errorResponse: ErrorResponse) => {
		throw new ProductError(
			errorResponse.errorMessage || '상품권 생성에 실패했습니다.',
			errorResponse,
		);
	});
};
