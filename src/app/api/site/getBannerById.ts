import { ErrorResponse } from '@/models/error';
import { BannerInfo } from '@/models/site';
import SiteError from '@/utils/error/SiteError';
import { BannerInfoFormData } from '@/utils/validation/site';

export interface BannerInfoResponse {
	code: number;
	status: string;
	message: string;
	data: BannerInfo;
}

export const getBannerById = async (id: number): Promise<BannerInfoResponse> => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/site-banner/${id}`);
	if (!response.ok) {
		const errorResponse: ErrorResponse = await response.json();
		throw new SiteError('배너 불러오기 실패', errorResponse);
	}
	return response.json();
};
