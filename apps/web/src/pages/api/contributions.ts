import type { APIRoute } from "astro";

import { getContributions } from "@/lib/github-contributions";

export const GET: APIRoute = async () => {
  const contributions = await getContributions();
  return Response.json(contributions, {
    headers: {
      "Cache-Control": "public, max-age=300",
      "Content-Type": "application/json",
    },
  });
};
