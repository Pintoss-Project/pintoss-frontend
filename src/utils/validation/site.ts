import { z } from 'zod';

export const siteInfoSchema = z.object({
	name: z.string().min(1, '상호명을 입력해주세요'),
	tel: z.string().min(1, '전화번호를 입력해주세요'),
	address: z.string().min(1, '주소를 입력해주세요'),
	owner: z.string().min(1, '대표명을 입력해주세요'),
	businesses: z.string().min(1, '사업자 번호를 입력해주세요'),
	reportNumber: z.string().min(1, '신고번호를 입력해주세요'),
	email: z.string().email('유효한 이메일을 입력해주세요'),
	kakao: z.string().optional(),
	openChat: z.string().optional(),
	businessHour: z.string().optional(),
});

export const bannerInfoSchema = z.object({
	bannerTitle: z.string().min(1, '배너 제목을 입력해주세요'),
	bannerLink: z.string().optional(),
});

export type SiteInfoFormData = z.infer<typeof siteInfoSchema>;
export type BannerInfoFormData = z.infer<typeof bannerInfoSchema>;
