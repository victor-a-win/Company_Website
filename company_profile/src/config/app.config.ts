// Backendless configuration
const BACKENDLESS_APP_ID =
  process.env.NEXT_PUBLIC_BACKENDLESS_APP_ID || "Backendless App Id";
const BACKENDLESS_API_KEY =
  process.env.NEXT_PUBLIC_BACKENDLESS_API_KEY || "Backendless API Key";
const BACKENDLESS_API_URL =
  process.env.NEXT_PUBLIC_BACKENDLESS_API_URL || "https://api.backendless.com";

export { BACKENDLESS_API_KEY, BACKENDLESS_API_URL, BACKENDLESS_APP_ID };
