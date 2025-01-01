declare global {
	interface Window {
		GX_pay?: (formId: string, mode: string, method: string) => void;
	}
}

export {};
