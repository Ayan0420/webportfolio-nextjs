import { createDirectus, rest } from "@directus/sdk";
import { DIRECTUS_API_URL } from "@/lib/config";

const directus = createDirectus(DIRECTUS_API_URL).with(
    rest({
        onRequest: (options) => ({ ...options, cache: "no-store" }),
    })
);

export default directus;