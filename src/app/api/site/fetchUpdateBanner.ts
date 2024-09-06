import { fetchApi } from '@/utils/fetchApi';
import { BannerInfoFormData } from '@/utils/validation/site';
import { ErrorResponse } from '@/models/error';
import SiteError from '@/utils/error/SiteError';

export const fetchUpdateBanner = async (id: number, data: BannerInfoFormData): Promise<void> => {
	return fetchApi<void>(`/api/site/banner/update?id=${id}`, {
		method: 'PATCH',
		body: data,
		token: false,
	}).catch((errorResponse: ErrorResponse) => {
		throw new SiteError(
			errorResponse.errorMessage || '배너 정보 업데이트에 실패했습니다.',
			errorResponse,
		);
	});
};
