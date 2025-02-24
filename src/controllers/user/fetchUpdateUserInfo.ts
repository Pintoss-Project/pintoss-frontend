import { fetchApi } from '@/utils/fetchApi';
import { OAuthRegisterFormData } from '@/utils/validation/auth';

export const fetchUpdateUserInfo = async (data: OAuthRegisterFormData) => {
	try {
		return await fetchApi(`${API_HOST_URL}/api/user/update`, {
			method: 'PATCH',
			token: false,
			body: data,
		});
	} catch (error: unknown) {
		console.error('유저 정보 업데이트 중 오류 발생:', error);

		if (error instanceof Error) {
			throw new Error(error.message || '유저 정보 업데이트에 실패했습니다.');
		}
		throw new Error('유저 정보 업데이트에 실패했습니다.');
	}
};
