import { z } from 'zod';

export const boardInfoSchema = z.object({
	title: z.string().min(1, '배너 제목을 입력해주세요'),
	content: z.string(),
});

export type BoardInfoFormData = z.infer<typeof boardInfoSchema>;
