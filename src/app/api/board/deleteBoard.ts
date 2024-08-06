import { ErrorResponse } from '@/models/error';
import BoardError from '@/utils/error/BoardError';

export const deleteBoard = async (id: number): Promise<void> => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/board/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (!response.ok) {
		const errorResponse: ErrorResponse = await response.json();
		throw new BoardError('배너 삭제 실패', errorResponse);
	}
};
