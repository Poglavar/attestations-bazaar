/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['ipfs.io', 'api.mapbox.com', 'nftipfs.link', '**'],
  },
};

export default nextConfig;
