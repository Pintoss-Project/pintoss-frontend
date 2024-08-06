import CustomError from './CustomError';
import { ErrorResponse } from '@/models/error';

class LoginError extends CustomError {
	constructor(message: string, response: ErrorResponse) {
		super(message, response);
	}
}

export default LoginError;
