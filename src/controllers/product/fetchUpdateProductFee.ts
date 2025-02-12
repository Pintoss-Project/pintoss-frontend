import { fetchApi } from '@/utils/fetchApi';
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

export interface UpdateProductFeeResponse {
	code: number;
	status: string;
	message: string;
	data: number;
}

export const fetchUpdateProductFee = async ({
	productId,
	data,
}: UpdateFeeParams): Promise<UpdateProductFeeResponse> => {
	return fetchApi<UpdateProductFeeResponse>(`/api/product/fee/update`, {
		method: 'PATCH',
		body: {
			productId,
			...data,
		},
		token: false,
	}).catch((errorResponse: ErrorResponse) => {
		throw new ProductError(
			errorResponse.errorMessage || '상품 수수료 업데이트에 실패했습니다.',
			errorResponse,
		);
	});
};
