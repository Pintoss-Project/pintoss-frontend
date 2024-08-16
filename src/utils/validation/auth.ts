import { z } from 'zod';

const passwordRequirements = z
	.string()
	.min(8, { message: '비밀번호는 8자 이상이어야 합니다.' })
	.max(20, { message: '비밀번호는 20자 이하이어야 합니다.' })
	.refine(
		(value) => {
			const hasEnglish = /[A-Za-z]/.test(value);
			const hasDigit = /\d/.test(value);
			const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

			return hasEnglish && hasDigit && hasSpecialChar;
		},
		{ message: '비밀번호는 영어, 숫자, 특수문자를 각각 하나 이상 포함해야 합니다.' },
	)
	.refine((value) => !/(\d)\1\1/.test(value), {
		message: '비밀번호에 같은 숫자를 연속해서 사용할 수 없습니다.',
	});

export const registerSchema = z
	.object({
		termsOfUse: z.boolean({ message: '이용약관에 동의해주세요.' }).refine((val) => val === true, {
			message: '이용약관에 동의해주세요.',
		}),
		privacyPolicy: z
			.boolean({ message: '개인정보 처리방침에 동의해주세요.' })
			.refine((val) => val === true, {
				message: '개인정보 처리방침에 동의해주세요.',
			}),
		email: z.string().email({ message: '유효하지 않은 이메일 형식입니다.' }),
		password: passwordRequirements,
		name: z
			.string()
			.min(2, { message: '이름을 정확히 입력해주세요. (2글자 이상, 숫자 제외)' })
			.regex(/^[가-힣a-zA-Z]+$/, { message: '이름은 한글 또는 영문자만 가능합니다.' }),
		phone: z.string().regex(/^01([0 | 1 | 6 | 7 | 8 | 9])-([0-9]{3,4})-([0-9]{4})$/, {
			message: '휴대폰 번호를 정확하게 입력해주세요. (- 포함)',
		}),
		confirmPassword: z.string(),
	})
	.superRefine(({ password, confirmPassword }, ctx) => {
		if (password !== confirmPassword) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: '비밀번호가 일치하지 않습니다.',
				path: ['confirmPassword'],
			});
		}
	});

export const oAuthRegisterSchema = z.object({
	termsOfUse: z.boolean({ message: '이용약관에 동의해주세요.' }).refine((val) => val === true, {
		message: '이용약관에 동의해주세요.',
	}),
	privacyPolicy: z
		.boolean({ message: '개인정보 처리방침에 동의해주세요.' })
		.refine((val) => val === true, {
			message: '개인정보 처리방침에 동의해주세요.',
		}),
	email: z.string().email({ message: '유효하지 않은 이메일 형식입니다.' }),
	name: z
		.string()
		.min(2, { message: '이름을 정확히 입력해주세요. (2글자 이상, 숫자 제외)' })
		.regex(/^[가-힣a-zA-Z]+$/, { message: '이름은 한글 또는 영문자만 가능합니다.' }),
	phone: z.string().regex(/^01([0 | 1 | 6 | 7 | 8 | 9])-([0-9]{3,4})-([0-9]{4})$/, {
		message: '휴대폰 번호를 정확하게 입력해주세요. (- 포함)',
	}),
	inflow: z.string(),
});

export const loginSchema = z.object({
	email: z.string().email({ message: '유효하지 않은 이메일 형식입니다.' }),
	password: z.string(),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
export type OAuthRegisterFormData = z.infer<typeof oAuthRegisterSchema>;
export type LogInFormData = z.infer<typeof loginSchema>;
