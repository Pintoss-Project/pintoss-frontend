import { fetchUserInfo } from '@/app/api/user/fetchUserInfo';
import { UserInfo } from '@/models/user';
import { atom, DefaultValue } from 'recoil';

// User Info API 호출 함수
interface UserInfoResponse {
	code: number;
	status: string;
	message: string;
	data: UserInfo;
}
// 인증 상태 관리
interface AuthState {
	isLoggedIn: boolean;
	userInfo: UserInfo | null;
}
const authState = atom<AuthState>({
	key: 'authState',
	default: {
		isLoggedIn: false,
		userInfo: null,
	},
	effects_UNSTABLE: [
		({ setSelf }) => {
			(async () => {
				const userInfoResponse = await fetchUserInfo();
				if (userInfoResponse && userInfoResponse.data) {
					setSelf({
						isLoggedIn: true,
						userInfo: userInfoResponse.data,
					});
				} else {
					setSelf({
						isLoggedIn: false,
						userInfo: null,
					});
				}
			})();
		},
	],
});

export default authState;
