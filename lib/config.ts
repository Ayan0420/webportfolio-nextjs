const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL;
if (!DIRECTUS_URL) {
  throw new Error("Missing NEXT_PUBLIC_DIRECTUS_URL environment variable.");
}

export const DIRECTUS_API_URL = DIRECTUS_URL;
export const DIRECTUS_ASSETS_URL = `${DIRECTUS_URL}/assets`;
