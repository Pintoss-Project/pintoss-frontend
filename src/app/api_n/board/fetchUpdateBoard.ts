import { BoardInfoFormData } from '@/utils/validation/board';
import { fetchApi } from '@/utils/fetchApi';
import { ErrorResponse } from '@/models/error';
import BoardError from '@/utils/error/BoardError';

export const fetchUpdateBoard = async (type: string, id: number, data: BoardInfoFormData) => {
	return fetchApi(`/api/board/update?id=${id}`, {
		method: 'PATCH',
		body: {
			type: type.toUpperCase(),
			writer: '관리자',
			...data,
		},
		token: false,
	}).catch((errorResponse: ErrorResponse) => {
		throw new BoardError(
			errorResponse.errorMessage || '게시글 업데이트에 실패했습니다.',
			errorResponse,
		);
	});
};
