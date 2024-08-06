import { ErrorResponse } from '@/models/error';

class LoginError extends Error {
	status: number;
	errorCodeMessage: string;
	errorMessage: string;

	constructor(message: string, response: ErrorResponse) {
		super(message);
		this.status = response.code;
		this.errorCodeMessage = response.errorCodeMessage;
		this.errorMessage = response.errorMessage;
	}
}

export default LoginError;
