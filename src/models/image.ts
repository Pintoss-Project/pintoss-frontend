export interface ImageUploadFormData {
	file: File;
}

export interface ImageResponse {
	id: number;
	url: string;
}

export interface ImageUploadResponse {
	code: number;
	status: string;
	message: string;
	data: ImageResponse[];
}
