const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return [
			{
				source: '/api/niceid/:path*',
				destination: '/app/api/niceid/:path*',
			},
			{
				source: '/api/:path*',
				destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/:path*`,
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
};

const withVanillaExtract = createVanillaExtractPlugin();

module.exports = withVanillaExtract(nextConfig);
