import { fetchUserInfo } from '@/app/api_n/user/fetchUserInfo';
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

});

export default authState;
