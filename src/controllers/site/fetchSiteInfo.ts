import { fetchApi } from '@/utils/fetchApi';
import { ErrorResponse } from '@/models/error';
import SiteError from '@/utils/error/SiteError';
import { SiteInfo } from '@/models/site';

interface SiteInfoResponse {
	code: number;
	status: string;
	message: string;
	data: SiteInfo;
}

export const dummySiteInfo: SiteInfo = {
	id: 1,
	name: "핀토스",
	tel: "00-123-4567",
	businessHour: "10:00 - 22:00",
	address: "--- --- --- ----",
	owner: "김--",
	businesses: "통신판매업",
	reportNumber: "123-45-67890",
	email: "pintoss@pin-toss.com",
	kakao: "m4202",
	openChat: "https://pf.kakao.com/m4202",
	logoImages: ["/images/logo1.png", "/images/logo2.png"],
	createdAt: "2023-01-01T00:00:00Z",
	updatedAt: "2023-01-01T00:00:00Z",
	topImageUrl: "/images/top-banner.jpg",
	bottomImageUrl: "/images/bottom-banner.jpg"
}

export const fetchSiteInfo = async (id: number): Promise<SiteInfoResponse> => {
	// return fetchApi<SiteInfoResponse>(`/api/site?id=${id}`, {
	// 	method: 'GET',
	// 	token: false,
	// }).catch((errorResponse: ErrorResponse) => {
	// 	throw new SiteError(
	// 		errorResponse.errorMessage || '사이트 정보를 불러오는데 실패했습니다.',
	// 		errorResponse,
	// 	);
	// });
	return {
		code: 200,
		status: 'success',
		message: 'Success',
		data: dummySiteInfo,
	};
};
