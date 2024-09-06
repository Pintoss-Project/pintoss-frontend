import { UserInfo } from '@/models/user';
import { fetchApi } from '@/utils/fetchApi';

interface UserInfoResponse {
	code: number;
	status: string;
	message: string;
	data: UserInfo;
}

export const fetchUserInfo = async (): Promise<UserInfoResponse> => {
	return fetchApi<UserInfoResponse>('/api/user/user_info', {
		method: 'GET',
		token: true,
	});
};
