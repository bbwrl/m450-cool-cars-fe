/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return [
			{
				source: '/api/cars',
				destination: 'http://localhost:8080/cars',
			},
		];
	},
};

export default nextConfig;
