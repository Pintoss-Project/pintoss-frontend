import { fetchApi } from '@/utils/fetchApi';
import { ErrorResponse } from '@/models/error';
import ProductError from '@/utils/error/ProductError';

export interface UpdateStockParams {
	productId: number;
	categoryId: number;
	data: number;
}

export interface UpdateStockResponse {
	code: number;
	status: string;
	message: string;
	data: number;
}

export const fetchUpdateProductStock = async ({
	productId,
	categoryId,
	data: stock,
}: UpdateStockParams): Promise<UpdateStockResponse> => {
	return fetchApi<UpdateStockResponse>(`/api/product/stock/update`, {
		method: 'PATCH',
		body: {
			productId,
			categoryId,
			data: stock,
		},
		token: false,
	}).catch((errorResponse: ErrorResponse) => {
		throw new ProductError(
			errorResponse.errorMessage || '재고 업데이트에 실패했습니다.',
			errorResponse,
		);
	});
};
