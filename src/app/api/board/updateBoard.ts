import { ErrorResponse } from '@/models/error';
import BoardError from '@/utils/error/BoardError';
import { BoardInfoFormData } from '@/utils/validation/board';
import { write } from 'fs';

export const updateBoard = async (type: string, id: number, data: BoardInfoFormData) => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/board/${id}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			type: type.toUpperCase(),
			writer: '관리자',
			...data,
		}),
	});

	if (!response.ok) {
		const errorResponse: ErrorResponse = await response.json();
		throw new BoardError(
			errorResponse.errorMessage || '게시글 업데이트에 실패했습니다.',
			errorResponse,
		);
	}

	return response.json();
};
