export interface UserInfo {
	id: number;
	email: string;
	name: string;
	phone: string;
	selected?: boolean;
}

export interface ManageUserInfo {
	id: number;
	email: string;
	name: string;
	phone: string;
	timestamp?: string;
	inflow?: string;
	sns?: string;
	selected?: boolean;
}

export interface ManageUserInfoResponse {
	code: number;
	status: string;
	message: string;
	data: {
		totalPages: number;
		totalElements: number;
		currentPage: number;
		pageSize: number;
		content: ManageUserInfo[];
	};
}

export interface OAuthUserRequest {
	email: string;
	name: string;
	phone: string;
	inflow?: string;
}

export interface LoginResponse {
	code: number;
	status: string;
	message: string;
	data: {
		grantType: string;
		accessToken: string;
		refreshToken: string;
	};
}

export interface CheckPhoneResponse {
	code: number;
	status: string;
	message: string;
	data: boolean;
}

export interface CheckIdResponse {
	code: number;
	status: string;
	message: string;
	data: boolean;
}
