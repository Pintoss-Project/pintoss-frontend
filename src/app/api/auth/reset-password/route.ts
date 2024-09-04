import { NextRequest, NextResponse } from 'next/server';

const JAVA_SERVER_BASE_URL = 'http://localhost:8080/api/user/reset-password';

export async function PATCH(req: NextRequest) {
	try {
		const { name, phone, newPassword } = await req.json();
		console.log(name, phone, newPassword);

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
	} catch (error: any) {
		console.error('Password reset error:', error);
		return NextResponse.json(
			{ message: 'An error occurred while resetting the password', error: error.message },
			{ status: 500 },
		);
	}
}
