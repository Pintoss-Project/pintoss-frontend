import { fetchApi } from '@/utils/fetchApi';
import BoardError from '@/utils/error/BoardError';

export const fetchDeleteBoardImage = async (imageId: number): Promise<void> => {
	return fetchApi<void>(`/api/board/image/delete?imageId=${imageId}`, {
		method: 'DELETE',
		token: false,
	}).catch((error) => {
		throw new BoardError('이미지 삭제 실패', error);
	});
};
