/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // images: {       
  //       domain: 'countryflagsapi.com',    
  // },

  env: {
    BASE_URL: process.env.BASE_URL,
  },

  images: {
    domains: ['countryflagsapi.com'],
  },
}

module.exports = nextConfig
