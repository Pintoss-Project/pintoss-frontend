'use client';

import { useEffect } from 'react';

const NiceRedirectHandler = () => {
	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const tokenVersionId = params.get('token_version_id');
		const encData = params.get('enc_data');
		const integrityValue = params.get('integrity_value');

		if (tokenVersionId && encData && integrityValue) {
			if (window.opener) {
				window.opener.postMessage(
					JSON.stringify({
						token_version_id: tokenVersionId,
						enc_data: encData,
						integrity_value: integrityValue,
					})
				);
				window.close();
			}
		}
	}, []);

	return (
		<div>
			<p>데이터 처리 중입니다...</p>
		</div>
	);
};

export default NiceRedirectHandler;
