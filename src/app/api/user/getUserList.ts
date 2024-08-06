import { ErrorResponse } from '@/models/error';
import { ManageUserInfo } from '@/models/user';
import CustomError from '@/utils/error/CustomError';

export interface UserListResponse {
	code: number;
	status: string;
	message: string;
	data: ManageUserInfo[];
}

export const getUserList = async (): Promise<UserListResponse> => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/user/all`);

	if (!response.ok) {
		const errorResponse: ErrorResponse = await response.json();
		console.log(errorResponse);
		throw new CustomError('유저리스트 조회 실패', errorResponse);
	}

	return response.json();
};
