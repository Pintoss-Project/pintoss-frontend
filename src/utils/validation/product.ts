import { z } from 'zod';

export const productInfoSchema = z.object({
	name: z.string().min(1, '상품권명을 입력해주세요'),
	homePage: z.string().min(1, '홈페이지를 입력해주세요'),
	csCenter: z.string().min(1, '고객센터 전화번호를 입력해주세요'),
	description: z.string(),
	publisher: z.string().min(1, '발행업체를 입력해주세요'),
	category: z.string().min(1, '카테고리를 선택해주세요'),
});

export type ProductInfoFormData = z.infer<typeof productInfoSchema>;
