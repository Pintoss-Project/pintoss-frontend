import CustomError from './CustomError';
import { ErrorResponse } from '@/models/error';

class SiteError extends CustomError {
	constructor(message: string, response: ErrorResponse) {
		super(message, response);
	}
}

export default SiteError;
