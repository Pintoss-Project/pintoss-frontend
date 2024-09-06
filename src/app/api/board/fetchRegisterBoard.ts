import { BoardInfoFormData } from '@/utils/validation/board';
import { fetchApi } from '@/utils/fetchApi';
import { ErrorResponse } from '@/models/error';
import BoardError from '@/utils/error/BoardError';

export const fetchRegisterBoard = async (type: string, data: BoardInfoFormData) => {
	return fetchApi(`/api/board/register`, {
		method: 'POST',
		body: {
			type: type.toUpperCase(),
			writer: '관리자',
			...data,
		},
		token: false,
	}).catch((errorResponse: ErrorResponse) => {
		throw new BoardError(
			errorResponse.errorMessage || '게시판 생성에 실패했습니다.',
			errorResponse,
		);
	});
};
