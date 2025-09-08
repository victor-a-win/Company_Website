import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "backendlessappcontent.com",
        pathname:
          "/787A5544-6A95-43BD-BB70-C046FDD5F600/AA32665B-0F88-49C6-9985-75AB6071F234/files/posts/**",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
        pathname: "/**",
      },
    ],
    // Add these for better image optimization
    formats: ["image/webp", "image/avif"],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Enable React strict mode for better error handling
  reactStrictMode: true,
};

export default withFlowbiteReact(nextConfig);
