import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Allow the sandboxed live-preview proxy origin in dev so HMR/websockets
  // and asset requests are not rejected as cross-origin.
  allowedDevOrigins: ["*.e2b.app", "localhost"],
};

export default nextConfig;
