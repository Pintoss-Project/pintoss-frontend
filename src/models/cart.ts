import { PriceCategoryInfo } from './product';

export interface CartItem {
	productId: number;
	priceCategoryId: number;
	name: string;
	quantity: number;
	payMethod: string;
	category?: PriceCategoryInfo;
}

export interface CartItemResponse {
	id: number;
	productId: number;
	priceCategoryId: number;
	name: string;
	quantity: number;
	payMethod: string;
	category?: PriceCategoryInfo;
}
