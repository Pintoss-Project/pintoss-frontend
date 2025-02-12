import { fetchApi } from '@/utils/fetchApi';
import { ErrorResponse } from '@/models/error';
import SiteError from '@/utils/error/SiteError';
import { SiteInfoFormData } from '@/utils/validation/site';

export const fetchUpdateSiteInfo = async (id: number, data: SiteInfoFormData): Promise<void> => {
	return fetchApi<void>(`/api/site/update?id=${id}`, {
		method: 'PATCH',
		body: data,
		token: false,
	}).catch((errorResponse: ErrorResponse) => {
		throw new SiteError(
			errorResponse.errorMessage || '사이트 정보 업데이트에 실패했습니다.',
			errorResponse,
		);
	});
};
