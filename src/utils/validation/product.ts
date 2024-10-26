import { z } from 'zod';

export const priceCategoryInfoSchema = z.object({
	name: z.string().min(1, '판매금액명을 입력해주세요'),
	price: z.number(),
});

export const productInfoSchema = z.object({
	name: z.string().min(1, '상품권명을 입력해주세요').optional(),
	homePage: z.string().min(1, '홈페이지를 입력해주세요').optional(),
	csCenter: z.string().min(1, '고객센터 전화번호를 입력해주세요').optional(),
	description: z.string().optional(),
	caution: z.string().optional(),
	publisher: z.string().min(1, '발행업체를 입력해주세요').optional(),
	category: z.string().min(1, '카테고리를 선택해주세요').optional(),
	priceCategories: z.array(priceCategoryInfoSchema).optional(),
	logoImageUrl: z.string().optional(),
});

export type ProductInfoFormData = z.infer<typeof productInfoSchema>;
export type PriceCategoryInfoFormData = z.infer<typeof priceCategoryInfoSchema>;
