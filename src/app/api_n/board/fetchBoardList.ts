import { BoardInfo } from '@/models/board';
import { fetchApi } from '@/utils/fetchApi';

interface BoardListResponse {
	code: number;
	status: string;
	message: string;
	data: BoardInfo[];
}

export const fetchBoardList = async (type: string): Promise<BoardListResponse> => {
	return fetchApi<BoardListResponse>(`/api/board/list?type=${type}`, {
		method: 'GET',
		token: false,
	});
};
