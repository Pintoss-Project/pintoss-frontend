import { fetchApi } from '@/utils/fetchApi';
import { ErrorResponse } from '@/models/error';
import SiteError from '@/utils/error/SiteError';
import { BannerInfo } from '@/models/site';

interface BannerInfoResponse {
	code: number;
	status: string;
	message: string;
	data: BannerInfo;
}

export const fetchBannerInfo = async (id: number): Promise<BannerInfoResponse> => {
	return fetchApi<BannerInfoResponse>(`/api/site/banner?id=${id}`, {
		method: 'GET',
		token: false,
	}).catch((errorResponse: ErrorResponse) => {
		throw new SiteError(
			errorResponse.errorMessage || '배너 정보를 불러오는 데 실패했습니다.',
			errorResponse,
		);
	});
};
