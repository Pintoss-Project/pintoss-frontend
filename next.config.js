const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return [
			// {
			// 	source: '/api/nice/callback',
			// 	destination: '/register/nice',
			// },
			{
				source: '/api/:path*',
				// destination: `http://pintossmall2.com/api/:path*`,
				destination: `https://pin-toss.com/api/:path*`,
			},
		];
	},
	reactStrictMode: true,
	images: {
		// loader: 'imgix',
		// path: 'https://pintossmall.mycafe24.com',
		// domains: ['https://pintossmall.mycafe24.com'],
		domains: ['res.cloudinary.com'],
	},
	// output: 'export',
	typescript: {
		ignoreBuildErrors: true, //타입에러 무시하고 빌드하기. 나중에 삭제할것
	},
	experimental: {
		missingSuspenseWithCSRBailout: false,
	},
};

const withVanillaExtract = createVanillaExtractPlugin();

module.exports = withVanillaExtract(nextConfig);
