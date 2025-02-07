export interface SiteInfo {
	id: number;
	name: string;
	tel: string;
	businessHour: string;
	address: string;
	owner: string;
	businesses: string;
	reportNumber: string;
	email: string;
	kakao?: string;
	openChat?: string;
	logoImages?: string[];
	createdAt?: string;
	updatedAt?: string;
	topImageUrl: string;
	bottomImageUrl: string;
}

export interface BannerInfo {
	id: number;
	bannerTitle: string;
	bannerLink: string;
	createdAt?: string;
	updatedAt?: string;
	desktopImageUrl: string;
	mobileImageUrl: string;
}
