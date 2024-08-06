const ACCESS_TOKEN_KEY = 'accessToken';

export const setLocalToken = (token: string) => {
  return localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

export const getLocalToken = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const removeLocalToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};
