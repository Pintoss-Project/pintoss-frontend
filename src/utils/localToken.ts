const ACCESS_TOKEN_KEY = 'accessToken';
const EXPIRATION_TIME = Date.now() + 1000 * 60 * 60;

export const setLocalToken = (token: string) => {
	return localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

export const getLocalToken = () => {
	return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const removeLocalToken = () => {
	localStorage.removeItem(ACCESS_TOKEN_KEY);
};

export const tokenExpiration = () => {
	return localStorage.setItem('tokenExpiration', EXPIRATION_TIME.toString());
};
