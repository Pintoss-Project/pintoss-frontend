import CustomError from './CustomError';
import { ErrorResponse } from '@/models/error';

class UserError extends CustomError {
	constructor(message: string, response: ErrorResponse) {
		super(message, response);
	}
}

export default UserError;
