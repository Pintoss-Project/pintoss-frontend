export const uploadImageToCloudinary = async (file: File) => {
	const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
	const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

	if (!uploadPreset || !cloudName) {
		throw new Error('Cloudinary 환경 변수가 설정되지 않았습니다.');
	}

	const formData = new FormData();
	formData.append('file', file);
	formData.append('upload_preset', uploadPreset);

	const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
		method: 'POST',
		body: formData,
	});

	if (!response.ok) {
		throw new Error('Failed to upload image to Cloudinary');
	}

	return await response.json();
};
