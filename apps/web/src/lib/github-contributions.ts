import type { Activity } from "@workspace/ui/components/kibo-ui/contribution-graph";

const CONTRIBUTIONS_URL = "https://github.com/users/abbesm0hamed/contributions";
const CACHE_KEY = "https://portfolio.example.com/github-contributions";
const CACHE_TTL_SECONDS = 6 * 60 * 60;
const EMPTY_CACHE_TTL_SECONDS = 5 * 60;

const LEVEL_COUNT_MAP: Record<number, number> = {
  0: 0,
  1: 1,
  2: 5,
  3: 15,
  4: 30,
};

let memoryCache: { data: Activity[]; timestamp: number; ttl: number } | null =
  null;
let inflight: Promise<Activity[]> | null = null;

const getCache = () =>
  typeof caches === "undefined"
    ? undefined
    : (caches as unknown as { default?: Cache }).default;

const readEdgeCache = async (): Promise<Activity[] | null> => {
  const cache = getCache();

  if (!cache) {
    return null;
  }

  try {
    const response = await cache.match(CACHE_KEY);

    if (!response) {
      return null;
    }

    return (await response.json()) as Activity[];
  } catch {
    return null;
  }
};

const writeEdgeCache = async (data: Activity[], ttl: number) => {
  const cache = getCache();

  if (!cache) {
    return;
  }

  try {
    await cache.put(
      CACHE_KEY,
      Response.json(data, {
        headers: {
          "Cache-Control": `public, max-age=${ttl}`,
        },
      })
    );
  } catch {
    // Cache write failed; the request is simply served uncached.
  }
};

const scrapeContributions = async (): Promise<Activity[]> => {
  const response = await fetch(CONTRIBUTIONS_URL, {
    headers: {
      Accept: "text/html",
      "User-Agent": "portfolio-bot",
    },
  });

  if (!response.ok) {
    console.warn(
      `Failed to fetch contributions: ${response.status} ${response.statusText}`
    );
    return [];
  }

  const html = await response.text();
  const pattern =
    /<td[^>]*?data-date="(?<date>\d{4}-\d{2}-\d{2})"[^>]*?data-level="(?<level>\d)"[^>]*?>/gu;
  const activities: Activity[] = [];
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(html)) !== null) {
    const { date, level } = match.groups as { date: string; level: string };
    activities.push({
      count: LEVEL_COUNT_MAP[Number(level)] ?? 0,
      date,
      level: Number(level),
    });
  }

  if (activities.length === 0) {
    console.warn("No contribution data found in GitHub response");
  }

  return activities;
};

export async function getContributions(): Promise<Activity[]> {
  if (inflight) {
    return inflight;
  }

  const now = Date.now();
  const isFresh = (entry: { timestamp: number; ttl: number }) =>
    now - entry.timestamp < entry.ttl * 1000;

  if (memoryCache && isFresh(memoryCache)) {
    return memoryCache.data;
  }

  const edgeData = await readEdgeCache();
  if (edgeData) {
    const ttl =
      edgeData.length > 0 ? CACHE_TTL_SECONDS : EMPTY_CACHE_TTL_SECONDS;
    memoryCache = { data: edgeData, timestamp: now, ttl };
    return edgeData;
  }

  inflight = scrapeContributions();
  try {
    const data = await inflight;
    const ttl = data.length > 0 ? CACHE_TTL_SECONDS : EMPTY_CACHE_TTL_SECONDS;
    memoryCache = { data, timestamp: Date.now(), ttl };
    await writeEdgeCache(data, ttl);
    return data;
  } catch (error) {
    console.warn("Failed to fetch GitHub contributions:", error);
    return [];
  } finally {
    inflight = null;
  }
}
