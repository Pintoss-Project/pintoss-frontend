const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		loader: 'imgix',
		path: 'https://pintossmall.mycafe24.com',
		domains: ['https://pintossmall.mycafe24.com'],
	},
	output: 'export',
};

const withVanillaExtract = createVanillaExtractPlugin();

module.exports = withVanillaExtract(nextConfig);
