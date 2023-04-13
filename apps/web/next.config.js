/** @type{import('next').NextConfig} */
module.exports = {
  experimental: {
    appDir: true,
  },
  webpack: (config) => {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'webassembly/async',
      issuer: /\.(tsx|ts|js|mjs|jsx)$/,
    });

    return config;
  },
};
