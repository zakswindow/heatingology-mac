import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
    // Disable source maps in production to reduce memory usage
    productionBrowserSourceMaps: false,
    // Optimize build
    // swcMinify: true,
    // Experimental features to reduce memory
    experimental: {
        // Reduce memory usage during build
        workerThreads: false,
        cpus: 1,
        // esmExternals: false,
        webpackMemoryOptimizations: true
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'placehold.co',
                port: '',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: 'assets.heatingology.com',
                port: '',
                pathname: '/**'
            },
        ]
    },
    sassOptions: {
        includePaths: [path.join(__dirname, "src")],
        additionalData: `
            @import "${path.join(__dirname, "src/styles/colours")}";
            @import "${path.join(__dirname, "src/styles/functions")}";
            @import "${path.join(__dirname, "src/styles/sizes")}";
            @import "${path.join(__dirname, "src/styles/mixins")}";
            @import "${path.join(__dirname, "src/styles/dialog")}";
            @import "${path.join(__dirname, "src/styles/keyframes")}";
        `,
        // Suppress Sass warnings
        silenceDeprecations: ['mixed-decls', 'legacy-js-api', 'import']
    },

    webpack(config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) {
        // Find the existing rule that handles SVG files
        const fileLoaderRule = config.module.rules.find((rule: any) =>
            rule.test?.test?.('.svg'));

        if (fileLoaderRule) {
            // Push new rules for SVG handling
            config.module.rules.push(
                // Reapply the existing rule, but only for svg imports ending in ?url
                {
                    ...fileLoaderRule,
                    test: /\.svg$/i,
                    resourceQuery: /url/ // *.svg?url
                },
                // Convert all *.svg imports to React components
                {
                    test: /\.svg$/i,
                    issuer: { not: /\.(css|scss|sass)$/ },
                    resourceQuery: { not: /url/ }, // exclude if *.svg?url
                    use: [
                        {
                            loader: '@svgr/webpack',
                            options: {
                                icon: true, // This makes SVGs scale better
                                svgoConfig: {
                                    plugins: [
                                        {
                                            name: 'preset-default',
                                            params: {
                                                overrides: { removeViewBox: false // Keep viewBox for scaling
                                                }
                                            }
                                        }
                                    ]
                                }
                            }
                        }
                    ]
                }
            );
            
            // Modify the file loader rule to ignore *.svg
            fileLoaderRule.exclude = /\.svg$/i;
        }

        return config;
    },
    turbopack: {
        rules: {
            '*.svg': {
                loaders: [
                    {
                        loader: '@svgr/webpack',
                        options: {
                            icon: true,
                            svgoConfig: {
                                plugins: [
                                    {
                                        name: 'preset-default',
                                        params: { overrides: { removeViewBox: false } }
                                    }
                                ]
                            }
                        }
                    }
                ],
                as: '*.js'
            }
        }
    },
    typescript: { ignoreBuildErrors: true }
};

export default nextConfig;