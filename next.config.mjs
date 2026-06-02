/** @type {import('next').NextConfig} */
const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL;
if (!directusUrl) {
    throw new Error('Missing NEXT_PUBLIC_DIRECTUS_URL environment variable.');
}
const nextConfig = {
    output: "standalone",
    // basePath: '/portfolio',
    transpilePackages: ['highlight.js'], // disallow highlight.js to be rebuilt to avoid regex error
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: new URL(directusUrl).hostname,
            }, 
            {
                protocol: 'https',
                hostname: 'placehold.co',
            }
        ],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        dangerouslyAllowSVG: true,
    },

};

export default nextConfig;
