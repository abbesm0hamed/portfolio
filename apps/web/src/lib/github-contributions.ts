import type { Activity } from "@workspace/ui/components/kibo-ui/contribution-graph";

const CONTRIBUTIONS_URL = "https://github.com/users/abbesm0hamed/contributions";

const LEVEL_COUNT_MAP: Record<number, number> = {
  0: 0,
  1: 1,
  2: 5,
  3: 15,
  4: 30,
};

const CACHE_TTL = 6 * 60 * 60 * 1000; // 6 hours
let cached: { data: Activity[]; timestamp: number } | null = null;

export async function getContributions(): Promise<Activity[]> {
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  try {
    const res = await fetch(CONTRIBUTIONS_URL, {
      headers: {
        Accept: "text/html",
        "User-Agent": "portfolio-bot",
      },
    });

    if (!res.ok) {
      console.warn(
        `Failed to fetch contributions: ${res.status} ${res.statusText}`
      );
      return [];
    }

    const html = await res.text();
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

    cached = { data: activities, timestamp: Date.now() };
    return activities;
  } catch (error) {
    console.warn("Failed to fetch GitHub contributions:", error);
    return [];
  }
}
