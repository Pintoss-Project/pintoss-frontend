import { BoardInfo } from '@/models/board';
import { ErrorResponse } from '@/models/error';
import BoardError from '@/utils/error/BoardError';

interface BoardListResponse {
	code: number;
	status: string;
	message: string;
	data: BoardInfo[];
}

export const getBoardList = async (type: string): Promise<BoardListResponse> => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/board?type=${type}`);

	if (!response.ok) {
		const errorResponse: ErrorResponse = await response.json();
		throw new BoardError(
			errorResponse.errorMessage || '게시판 목록을 가져오는 데 실패했습니다.',
			errorResponse,
		);
	}

	return response.json();
};
