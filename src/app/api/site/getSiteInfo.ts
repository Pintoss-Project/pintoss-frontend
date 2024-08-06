import { ErrorResponse } from '@/models/error';
import { SiteInfo } from '@/models/site';
import SiteError from '@/utils/error/SiteError';

export interface SiteInfoResponse {
	code: number;
	status: string;
	message: string;
	data: SiteInfo;
}

export const getSiteInfo = async (id: number): Promise<SiteInfoResponse> => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/site-info/${id}`);

	if (!response.ok) {
		const errorResponse: ErrorResponse = await response.json();
		throw new SiteError(
			errorResponse.errorMessage || '사이트 정보를 불러오는데 실패했습니다.',
			errorResponse,
		);
	}
	return response.json();
};
