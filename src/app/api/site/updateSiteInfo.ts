import { ErrorResponse } from '@/models/error';
import SiteError from '@/utils/error/SiteError';
import { SiteInfoFormData } from '@/utils/validation/site';

export const updateSiteInfo = async (
	id: number,
	data: SiteInfoFormData,
): Promise<SiteInfoFormData> => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/site-info/${id}`,
		{
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		},
	);

	if (!response.ok) {
		const errorResponse: ErrorResponse = await response.json();
		throw new SiteError(
			errorResponse.errorMessage || '사이트 정보 업데이트에 실패했습니다.',
			errorResponse,
		);
	}

	return response.json();
};
