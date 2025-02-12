import { useEffect } from 'react';

const usePaymentScript = () => {
	useEffect(() => {
		// 스크립트 동적으로 추가
		const script = document.createElement('script');
		script.src = 'https://pay.billgate.net/paygate/plugin/gx_web_client.js';
		script.type = 'text/javascript';
		script.async = true;

		script.onload = () => {
			console.log('Payment script loaded successfully.');
		};

		script.onerror = () => {
			console.error('Failed to load the payment script.');
		};

		document.head.appendChild(script);

		// Cleanup script when the component unmounts
		return () => {
			document.head.removeChild(script);
		};
	}, []);
};

export default usePaymentScript;
