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
