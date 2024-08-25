import crypto from 'crypto';

export const deleteImageFromCloudinary = async (publicId: string) => {
	const timestamp = Math.floor(new Date().getTime() / 1000);

	const apiSecret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET;
	const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
	const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

	if (!apiSecret || !apiKey || !cloudName) {
		throw new Error('Cloudinary API 환경 변수가 설정되지 않았습니다.');
	}

	const signature = crypto
		.createHash('sha1')
		.update(`public_id=${publicId}&timestamp=${timestamp}${apiSecret}`)
		.digest('hex');

	const formData = new FormData();
	formData.append('public_id', publicId);
	formData.append('signature', signature);
	formData.append('api_key', apiKey);
	formData.append('timestamp', timestamp.toString());

	const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, {
		method: 'POST',
		body: formData,
	});

	if (!response.ok) {
		throw new Error('Failed to delete image from Cloudinary');
	}

	return await response.json();
};
