import { ErrorResponse } from '@/models/error';
import SiteError from '@/utils/error/SiteError';

export const deleteBanner = async (id: number): Promise<void> => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/site-banner/${id}`,
		{
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		},
	);

	if (!response.ok) {
		const errorResponse: ErrorResponse = await response.json();
		throw new SiteError('배너 삭제 실패', errorResponse);
	}
};
