import { fetchApi } from '@/utils/fetchApi';
import { ErrorResponse } from '@/models/error';
import CartError from '@/utils/error/CartError';

export const fetchUpdateCartPayMethod = async (userId: number, payMethod: string) => {
	try {
		return await fetchApi<void>(
			`/api/cart/update/pay_method?userId=${userId}&newPayMethod=${payMethod}`,
			{
				method: 'PATCH',
				token: true,
			},
		);
	} catch (error) {
		const errorResponse = error as ErrorResponse;
		throw new CartError(
			errorResponse.errorMessage || '장바구니 결제 수단 업데이트에 실패했습니다.',
			errorResponse,
		);
	}
};
