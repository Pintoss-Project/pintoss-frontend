const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return [
			{
				source: '/api/niceid/:path*',
				destination: '/app/api/niceid/:path*',
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
};

const withVanillaExtract = createVanillaExtractPlugin();

module.exports = withVanillaExtract(nextConfig);
