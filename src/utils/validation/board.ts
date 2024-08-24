import { z } from 'zod';

export const boardInfoSchema = z.object({
	title: z.string().min(1, '배너 제목을 입력해주세요'),
	content: z.string(),
	imageUrls: z.array(z.string().url()).optional(),
});

export type BoardInfoFormData = z.infer<typeof boardInfoSchema>;
