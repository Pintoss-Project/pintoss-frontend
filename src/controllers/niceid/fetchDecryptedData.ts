import { fetchApi } from '@/utils/fetchApi';

interface DecryptedData {
	name: string;
	mobileno: string;
}

export const fetchDecryptedData = async (
	tokenVersionId: string,
	encData: string,
	integrityValue: string,
): Promise<DecryptedData> => {
	return fetchApi<DecryptedData>('/api/niceid/decrypt', {
		method: 'POST',
		token: false,
		body: {
			token_version_id: tokenVersionId,
			enc_data: encData,
			integrity_value: integrityValue,
		},
	});
};
