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
  eslint: {
    // Ignora errores de ESLint cuando corres `next build`
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignora errores de TS durante la build
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
