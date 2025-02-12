import { fetchApi } from '@/utils/fetchApi';
import { ErrorResponse } from '@/models/error';
import SiteError from '@/utils/error/SiteError';
import { SiteInfo } from '@/models/site';

interface SiteInfoResponse {
	code: number;
	status: string;
	message: string;
	data: SiteInfo;
}

export const fetchSiteInfo = async (id: number): Promise<SiteInfoResponse> => {
	return fetchApi<SiteInfoResponse>(`/api/site?id=${id}`, {
		method: 'GET',
		token: false,
	}).catch((errorResponse: ErrorResponse) => {
		throw new SiteError(
			errorResponse.errorMessage || '사이트 정보를 불러오는데 실패했습니다.',
			errorResponse,
		);
	});
};
