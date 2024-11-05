export interface PriceCategoryInfo {
	id: number;
	name: string;
	price: number;
	stock: number;
	createdAt: string;
}

export interface ProductInfoListResponse {
	code: number;
	status: string;
	message: string;
	data: ProductInfo[];
}

export interface ProductInfo {
	id: number;
	name: string;
	isPopular: boolean;
	cardDiscount: number;
	phoneDiscount: number;
	homePage: string;
	csCenter: string;
	description: string;
	note: string;
	publisher: string;
	category: string;
	logoImageUrl?: string;
	createdAt: string;
	updatedAt: string;
	priceCategories?: PriceCategoryInfo[];
}

export interface SimpleProductInfo {
	id: number;
	name: string;
	logoImageUrl?: string;
	cardDiscount?: number;
	phoneDiscount?: number;
}
