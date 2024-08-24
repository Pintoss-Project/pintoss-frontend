export const deleteImageFromCloudinary = async (publicId: string) => {
	const timestamp = Math.floor(new Date().getTime() / 1000);
	const signature = require('crypto')
		.createHash('sha1')
		.update(
			`public_id=${publicId}&timestamp=${timestamp}${process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET}`,
		)
		.digest('hex');

	const formData = new FormData();
	formData.append('public_id', publicId);
	formData.append('signature', signature);
	formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
	formData.append('timestamp', timestamp.toString());

	const response = await fetch(
		`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/destroy`,
		{
			method: 'POST',
			body: formData,
		},
	);

	if (!response.ok) {
		throw new Error('Failed to delete image from Cloudinary');
	}

	return await response.json();
};
