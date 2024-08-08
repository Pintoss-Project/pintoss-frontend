import { z } from 'zod';

export const loginSchema = z.object({
	email: z.string().email({ message: '유효하지 않은 이메일 형식입니다.' }),
	password: z.string(),
});

export type LogInFormData = z.infer<typeof loginSchema>;
