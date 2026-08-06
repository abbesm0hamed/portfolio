import type { APIRoute } from "astro";

import { getContributions } from "@/lib/github-contributions";

export const GET: APIRoute = async () => {
  const data = await getContributions();

  return Response.json(data, {
    headers: {
      "Cache-Control": "public, max-age=300, stale-while-revalidate=3600",
    },
  });
};
