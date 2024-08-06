export interface PriceCategory {
	category_id: number;
	name: string;
	price: number;
	stock: number;
	created_at: string;
}

export interface Product {
	product_id: number;
	name: string;
	isPopular: boolean;
	card_discount: number;
	phone_discount: number;
	home_page: string;
	cs_center: string;
	description: string;
	publisher: string;
	category: string;
	created_at: string;
	updated_at: string;
	image_url: string;
	price_categories: PriceCategory[];
}
