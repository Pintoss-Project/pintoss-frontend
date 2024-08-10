export interface PriceCategoryInfo {
	id: number;
	name: string;
	price: number;
	stock: number;
	created_at: string;
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
	publisher: string;
	category: string;
	logo?: string;
	createdAt: string;
	updatedAt: string;
	priceCategories?: PriceCategoryInfo[];
}
