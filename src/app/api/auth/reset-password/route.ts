import { NextRequest, NextResponse } from 'next/server';

const JAVA_SERVER_BASE_URL = 'http://pintossmall2.cafe24.com/api/user/reset-password';

export async function PATCH(req: NextRequest) {
	try {
		const { name, phone, newPassword } = await req.json();

		if (!name || !phone || !newPassword) {
			return NextResponse.json(
				{ message: 'Name, phone, and password are required' },
				{ status: 400 },
			);
		}

		const response = await fetch(JAVA_SERVER_BASE_URL, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name, phone, newPassword }),
		});

		if (!response.ok) {
			const error = await response.json();
			console.error('Failed to reset password:', error);
			return NextResponse.json(
				{ message: 'Failed to reset password', details: error },
				{ status: response.status },
			);
		}

		return NextResponse.json({ message: 'Password has been successfully reset' }, { status: 200 });
	} catch (error: unknown) {
		console.error('Password reset error:', error);
		if (error instanceof Error) {
			return NextResponse.json(
				{ message: 'An error occurred while resetting the password', error: error.message },
				{ status: 500 },
			);
		} else {
			return NextResponse.json(
				{
					message: 'An error occurred while resetting the password',
					error: 'Unknown error occurred',
				},
				{ status: 500 },
			);
		}
	}
}
