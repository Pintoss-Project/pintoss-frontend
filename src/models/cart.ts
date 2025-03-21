import { PriceCategoryInfo } from './product';

export interface CartItem {
	productId: number;
	priceCategoryId: number;
	name: string;
	quantity: number;
	payMethod: string;
	category?: PriceCategoryInfo;
	price: number;
}

export interface CartItemResponse {
	id: number;
	productId: number;
	priceCategoryId: number;
	name: string;
	quantity: number;
	payMethod: string;
	category?: PriceCategoryInfo;
	price: number;
	cardDiscount: number;
	phoneDiscount: number;
	logoImageUrl: string;
}
