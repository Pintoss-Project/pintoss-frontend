import { getLocalToken } from './../../../utils/localToken';
import { ErrorResponse } from '@/models/error';
import { ManageUserInfoResponse, UserInfo } from '@/models/user';
import UserError from '@/utils/error/UserError';

interface UserInfoResponse {
	code: number;
	status: string;
	message: string;
	data: UserInfo;
}

export const getUserInfo = async (): Promise<UserInfoResponse> => {
	const token = getLocalToken();

	const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/user_info`, {
		method: 'GET',
		headers: {
			'Authorization': `bearer ${token}`,
			'Content-Type': 'application/json',
		},
	});

	if (!response.ok) {
		const errorResponse: ErrorResponse = await response.json();
		throw new UserError('유저 조회 실패', errorResponse);
	}

	return response.json();
};
