import { fetchApi } from '@/utils/fetchApi';
import { ErrorResponse } from '@/models/error';
import SiteError from '@/utils/error/SiteError';
import { SiteInfo } from '@/models/site';

interface AllSiteInfoResponse {
	code: number;
	status: string;
	message: string;
	data: SiteInfo[];
}

export const fetchSiteList = async (): Promise<AllSiteInfoResponse> => {
	return fetchApi<AllSiteInfoResponse>('/api/site/list', {
		method: 'GET',
		token: false,
	}).catch((errorResponse: ErrorResponse) => {
		throw new SiteError(
			errorResponse.errorMessage || '사이트 정보 리스트를 불러오는데 실패했습니다.',
			errorResponse,
		);
	});
};
