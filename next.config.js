/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["cdn.akamai.steamstatic.com", "avatars.steamstatic.com", "randomuser.me"]
    },
    experimental: {
        serverActions: true,
    },
}

module.exports = nextConfig
