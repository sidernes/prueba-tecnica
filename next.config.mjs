/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // o bien usa `domains: ["picsum.photos"]` para un dominio fijo
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
