import { fetchApi } from '@/utils/fetchApi';
import { BannerInfoFormData } from '@/utils/validation/site';
import { ErrorResponse } from '@/models/error';
import SiteError from '@/utils/error/SiteError';

export const fetchRegisterBanner = async (data: BannerInfoFormData): Promise<void> => {
	return fetchApi<void>('/api/site/banner/register', {
		method: 'POST',
		body: data,
		token: false,
	}).catch((errorResponse: ErrorResponse) => {
		throw new SiteError(errorResponse.errorMessage || '배너 등록에 실패했습니다.', errorResponse);
	});
};
