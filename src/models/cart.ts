import { PriceCategoryInfo } from './product';

export interface CartItem {
	productId: number;
	priceCategoryId: number;
	name: string;
	quantity: number;
	price: number;
	payMethod: string;
	category?: PriceCategoryInfo;
}
