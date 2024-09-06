import { fetchApi } from '@/utils/fetchApi';
import BoardError from '@/utils/error/BoardError';

export const fetchDeleteBoard = async (id: number): Promise<void> => {
	return fetchApi<void>(`/api/board/delete?id=${id}`, {
		method: 'DELETE',
		token: false,
	}).catch((error) => {
		throw new BoardError('배너 삭제 실패', error);
	});
};
