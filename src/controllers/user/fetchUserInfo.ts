import { UserInfo } from '@/models/user';

export const fetchUserInfo = async (): Promise<UserInfo | null> => {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/user_info`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include', // 쿠키를 요청에 포함
		});

		if (!response.ok) {
			console.error(`Failed to fetch user info: ${response.status}`);
			return null; // 실패 시 null 반환
		}

		const data = await response.json();
		return data.data; // data의 내부 data를 반환
	} catch (error) {
		console.warn('Error fetching user info:', error);
		return null; // 실패 시 null 반환
	}
};
