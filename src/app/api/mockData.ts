import { Product } from '@/models/product';

export const getAllProductIds = async () => {
	return [{ id: '1' }, { id: '2' }, { id: '3' }];
};

export const getProductData = async (id: string): Promise<Product> => {
	return {
		product_id: parseInt(id),
		name: `Product ${id}`,
		isPopular: true,
		card_discount: 3,
		phone_discount: 1.2,
		home_page: 'www.homepage.co.kr',
		cs_center: '1234-5678',
		description: '상세설명',
		publisher: '북앤라이프',
		category: 'cbm',
		created_at: '2024-07-10',
		updated_at: '2024-07-18',
		image_url: 'xxx.jpg',
		price_categories: [
			{
				category_id: 1,
				name: '3천원권',
				price: 3000,
				stock: 10,
				created_at: '2024-07-10',
			},
			{
				category_id: 2,
				name: '5천원권',
				price: 5000,
				stock: 20,
				created_at: '2024-07-10',
			},
		],
	};
};
