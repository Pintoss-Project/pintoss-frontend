export interface ErrorResponse {
	code: number;
	status: string;
	errorCodeMessage: string;
	errorMessage: string;
	timestamp: string;
	errors?: Record<string, string>;
}
