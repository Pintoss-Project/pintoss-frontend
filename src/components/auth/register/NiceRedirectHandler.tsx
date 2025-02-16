'use client';

import { useEffect } from 'react';

const NiceRedirectHandler = () => {
	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		// const tokenVersionId = params.get('token_version_id');
		// const encData = params.get('enc_data');
		// const integrityValue = params.get('integrity_value');
		const tel = params.get('tel');
		const name = params.get('name');
		const success = params.get('success');

		console.log('data', name, tel, success);

		if (success === 'true') {
			if (window.opener) {
				window.opener.postMessage(
					JSON.stringify({
						name,
						tel,
					})
				);
				window.close();
			}
		} else {
			alert(`본인인증에 실패하였습니다. ${name}`);
			window.close();
		}
	}, []);

	return (
		<div>
			<p>데이터 처리 중입니다...</p>
		</div>
	);
};

export default NiceRedirectHandler;
