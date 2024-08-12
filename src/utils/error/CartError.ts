import CustomError from './CustomError';
import { ErrorResponse } from '@/models/error';

class CartError extends CustomError {
	constructor(message: string, response: ErrorResponse) {
		super(message, response);
	}
}

export default CartError;
