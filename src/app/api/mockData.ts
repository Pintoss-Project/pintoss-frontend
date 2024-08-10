import { ProductInfo } from '@/models/product';

export const getAllProductIds = async () => {
	return [{ id: '1' }, { id: '2' }, { id: '3' }];
};

export const getProductData = async (id: string): Promise<ProductInfo> => {
	return {
		id: parseInt(id),
		name: `Product ${id}`,
		isPopular: true,
		cardDiscount: 3,
		phoneDiscount: 1.2,
		homePage: 'www.homepage.co.kr',
		csCenter: '1234-5678',
		description: '상세설명',
		publisher: '북앤라이프',
		category: 'cbm',
		createdAt: '2024-07-10',
		updatedAt: '2024-07-18',
		logo: 'xxx.jpg',
		priceCategories: [
			{
				id: 1,
				name: '3천원권',
				price: 3000,
				stock: 10,
				createdAt: '2024-07-10',
			},
			{
				id: 2,
				name: '5천원권',
				price: 5000,
				stock: 20,
				createdAt: '2024-07-10',
			},
		],
	};
};
