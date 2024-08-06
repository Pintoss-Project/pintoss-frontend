import { ErrorResponse } from '@/models/error';
import { BannerInfo } from '@/models/site';
import SiteError from '@/utils/error/SiteError';

export interface BannerInfoResponse {
	code: number;
	status: string;
	message: string;
	data: BannerInfo[];
}

export const getBannerList = async (): Promise<BannerInfoResponse> => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/site-banner`);

	if (!response.ok) {
		const errorResponse: ErrorResponse = await response.json();
		throw new SiteError(
			errorResponse.errorMessage || '배너 리스트 정보를 불러오는데 실패했습니다.',
			errorResponse,
		);
	}
	return response.json();
};
