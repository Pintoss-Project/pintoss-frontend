import { ErrorResponse } from '@/models/error';
import SiteError from '@/utils/error/SiteError';
import { BannerInfoFormData } from '@/utils/validation/site';

export const postBanner = async (data: BannerInfoFormData): Promise<BannerInfoFormData> => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/site-banner`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		const errorResponse: ErrorResponse = await response.json();
		throw new SiteError(
			errorResponse.errorMessage || '배너 정보 생성에 실패했습니다.',
			errorResponse,
		);
	}

	return response.json();
};
