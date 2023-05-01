/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      appDir: true,
    },
    images:{
      domains:['image.tmdb.org', 'github.com']
    }

  }
  
  module.exports = nextConfig