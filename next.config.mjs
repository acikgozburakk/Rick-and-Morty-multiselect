/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer, webpack }) => {
        config.module.rules.push({
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        });
        return config; 
      },
};

export default nextConfig;
