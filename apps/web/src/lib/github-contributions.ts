import type { Activity } from "@workspace/ui/components/kibo-ui/contribution-graph";

const GITHUB_USERNAME = "abbesm0hamed";
const CACHE_KEY = "https://portfolio.example.com/v2/github-contributions";
const CACHE_TTL_SECONDS = 6 * 60 * 60;
const EMPTY_CACHE_TTL_SECONDS = 5 * 60;

const LEVEL_MAP: Record<string, 0 | 1 | 2 | 3 | 4> = {
  FIRST_QUARTILE: 1,
  FOURTH_QUARTILE: 4,
  NONE: 0,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
};

const CONTRIBUTIONS_QUERY = `query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        weeks {
          contributionDays {
            date
            contributionCount
            contributionLevel
          }
        }
      }
    }
  }
}`;

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

interface GraphQLResponse {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          weeks: {
            contributionDays: {
              contributionCount: number;
              contributionLevel: string;
              date: string;
            }[];
          }[];
        };
      };
    };
  };
}

const fetchContributions = async (): Promise<Activity[]> => {
  const token = import.meta.env.GITHUB_TOKEN;

  if (!token) {
    return [];
  }

  const res = await fetch("https://api.github.com/graphql", {
    body: JSON.stringify({
      query: CONTRIBUTIONS_QUERY,
      variables: { login: GITHUB_USERNAME },
    }),
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "portfolio-website",
    },
    method: "POST",
  });

  if (!res.ok) {
    return [];
  }

  const json = (await res.json()) as GraphQLResponse;

  return (
    json.data?.user?.contributionsCollection?.contributionCalendar?.weeks
      ?.flatMap((w) => w.contributionDays)
      ?.map((d) => ({
        count: d.contributionCount,
        date: d.date,
        level: LEVEL_MAP[d.contributionLevel] ?? 0,
      })) ?? []
  );
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

  inflight = fetchContributions();
  try {
    const data = await inflight;
    const ttl = data.length > 0 ? CACHE_TTL_SECONDS : EMPTY_CACHE_TTL_SECONDS;
    memoryCache = { data, timestamp: Date.now(), ttl };
    await writeEdgeCache(data, ttl);
    return data;
  } catch {
    return [];
  } finally {
    inflight = null;
  }
}
