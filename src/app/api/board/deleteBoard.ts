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

export const deleteImageFromBackend = async (imageId: number) => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/images/${imageId}`, {
		method: 'DELETE',
	});

	if (!response.ok) {
		const errorResponse = await response.json();
		throw new Error(errorResponse.errorMessage || '이미지 삭제에 실패했습니다.');
	}

	return await response.json();
};
