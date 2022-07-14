/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	async rewrites() {
		return [
			{
				source: "/oauth2.0/:path*", // url이 source에 해당될 경우
				destination: "https://nid.naver.com/oauth2.0/:path*", // destination으로 redirect
			},
		];
	},
	images: {
		domains: ["imagedelivery.net", "upload.imagedelivery.net"],
	},
	env: {
		DATABASE_URL: process.env.NEXT_PUBLIC_DATABASE_URL,
		COOKIE_PASSWORD: process.env.NEXT_PUBLIC_COOKIE_PASSWORD,
		NAVER_LOGIN_ID: process.env.NEXT_PUBLIC_NAVER_LOGIN_ID,
		NAVER_LOGIN_PASSWORD: process.env.NEXT_PUBLIC_NAVER_LOGIN_PASSWORD,
		CF_TOKEN: process.env.NEXT_PUBLIC_CF_TOKEN,
		CF_ID: process.env.NEXT_PUBLIC_CF_ID,
	},
};

module.exports = nextConfig;
