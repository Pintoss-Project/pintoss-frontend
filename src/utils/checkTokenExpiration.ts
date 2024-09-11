import { getLocalToken, removeLocalToken } from './localToken';

export const checkExpiration = () => {
	const expiration = localStorage.getItem('tokenExpiration');
	const token = getLocalToken();

	if (expiration && Date.now() > parseInt(expiration)) {
		console.log('Token expired, removing token and updating state');
		removeLocalToken();
		localStorage.removeItem('tokenExpiration');
	}

	return token;
};
