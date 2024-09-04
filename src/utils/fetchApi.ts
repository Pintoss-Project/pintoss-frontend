export const fetchApi = async (url: string, options: RequestInit) => {
	const response = await fetch(url, options);
	if (!response.ok) {
		const errorMessage = `Error: ${response.status} ${response.statusText}`;
		throw new Error(errorMessage);
	}
	return response.json();
};
