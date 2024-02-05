import nextEnv from 'next-env';
import dotenvLoad from 'dotenv-load';
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';

dotenvLoad();
 
const withNextEnv = nextEnv();

 /** @type {import('next').NextConfig}*/
const config = (phase, { defaultConfig }) => (console.log('phase', phase, 'PHASE_DEVELOPMENT_SERVER', PHASE_DEVELOPMENT_SERVER), {
  ...(phase !== PHASE_DEVELOPMENT_SERVER ? {
    output: "export",
    basePath: "/contenter",
    images: {
      unoptimized: true,
    },
  } : {}),

  distDir: 'app',
  strictMode: false,
  
  webpack: (config) => {   
    config.resolve.fallback = {
      "buffer":false,
      "events": false,
      "os": false,
      "fs": false,
      "tls": false,
      "net": false,
      "path": false,
      "zlib": false,
      "http": false,
      "https": false,
      "stream": false,
      "crypto": false,
    };

    return config;
  },
})

export default withNextEnv(config);
