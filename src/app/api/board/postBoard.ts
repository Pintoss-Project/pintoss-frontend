import { ErrorResponse } from '@/models/error';
import BoardError from '@/utils/error/BoardError';
import { BoardInfoFormData } from '@/utils/validation/board';

export const postBoard = async (type: string, data: BoardInfoFormData) => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/board`, {
		method: 'POST',
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
			errorResponse.errorMessage || '게시판 생성에 실패했습니다.',
			errorResponse,
		);
	}

	return response.json();
};
