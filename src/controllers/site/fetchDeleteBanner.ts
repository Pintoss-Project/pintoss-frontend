import { fetchApi } from '@/utils/fetchApi';
import { ErrorResponse } from '@/models/error';
import SiteError from '@/utils/error/SiteError';

export const fetchDeleteBanner = async (id: number): Promise<void> => {
	return fetchApi<void>(`/api/site/banner/delete?id=${id}`, {
		method: 'DELETE',
		token: false,
	}).catch((errorResponse: ErrorResponse) => {
		throw new SiteError('배너 삭제 실패', errorResponse);
	});
};
