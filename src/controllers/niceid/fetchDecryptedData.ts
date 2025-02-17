import { fetchApi } from '@/utils/fetchApi';

interface DecryptedData {
	code: number;
	data: {
		name: string;
		tel: string;
	}
}

export const fetchDecryptedData = async (
	tokenVersionId: string,
	encData: string,
	integrityValue: string,
): Promise<DecryptedData> => {
	return fetchApi<DecryptedData>('/api/nice/callback', {
		method: 'POST',
		token: false,
		body: {
			token_version_id: tokenVersionId,
			enc_data: encData,
			integrity_value: integrityValue,
		},
	});
};
