/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        esmExternals: "loose",
        serverComponentsExternalPackages: ["mongoose"],
    },
    images: {
        domains: [
            "cdn.akamai.steamstatic.com",
            "shared.akamai.steamstatic.com",
            "avatars.steamstatic.com",
            "avatars.cloudflare.steamstatic.com",
            'avatars.akamai.steamstatic.com',
            "randomuser.me",
            "cdn.cloudflare.steamstatic.com"
        ],
    },
    webpack: (config) => {
        config.experiments = {
            topLevelAwait: true,
            layers: true, // <-- add this
        };
        return config;
    },

}

module.exports = nextConfig
