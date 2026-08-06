"use client";

import type { Activity } from "@workspace/ui/components/kibo-ui/contribution-graph";
import { cn } from "@workspace/ui/lib/utils";
import { useEffect, useState } from "react";

const LEVEL_FILLS = [
  "fill-muted",
  "fill-muted-foreground/20",
  "fill-muted-foreground/40",
  "fill-muted-foreground/60",
  "fill-muted-foreground/80",
];

const levelFill = (level: number) => LEVEL_FILLS[level] ?? "fill-muted";

const SKELETON_WEEKS = 53;
const SKELETON_DAYS = 7;

const buildWeeks = (contributions: Activity[]): number[][] => {
  const sorted = [...contributions].toSorted((a, b) =>
    a.date.localeCompare(b.date)
  );
  const levelMap = new Map<string, number>(
    sorted.map((a) => [a.date, a.level])
  );

  const weeks: number[][] = [];

  if (sorted.length === 0) {
    return weeks;
  }

  const [first] = sorted;
  const last = sorted.at(-1);

  if (!first || !last) {
    return weeks;
  }

  const firstDate = new Date(first.date);
  const startDate = new Date(firstDate);
  startDate.setDate(firstDate.getDate() - firstDate.getDay());

  const endDate = new Date(last.date);
  endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

  const endTime = endDate.getTime();
  const current = new Date(startDate);
  let currentWeek: number[] = [];

  while (current.getTime() <= endTime) {
    currentWeek.push(levelMap.get(current.toISOString().slice(0, 10)) ?? 0);

    if (currentWeek.length === SKELETON_DAYS) {
      weeks.push(currentWeek);
      currentWeek = [];
    }

    current.setDate(current.getDate() + 1);
  }

  return weeks;
};

interface GHHeatmapProps {
  className?: string;
}

export default function GHHeatmap({ className }: GHHeatmapProps) {
  const [weeks, setWeeks] = useState<number[][] | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      try {
        const res = await fetch("/api/contributions", {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch contributions: ${res.status}`);
        }

        const data = (await res.json()) as Activity[];
        setWeeks(buildWeeks(data));
      } catch {
        setWeeks([]);
      }
    };

    void load();

    return () => controller.abort();
  }, []);

  if (weeks === null) {
    return (
      <div className={cn("animate-pulse", className)} aria-hidden="true">
        <div className="flex size-full gap-px">
          {Array.from({ length: SKELETON_WEEKS }).map((_week, weekIndex) => (
            <div key={weekIndex} className="flex flex-1 flex-col gap-px">
              {Array.from({ length: SKELETON_DAYS }).map((_day, dayIndex) => (
                <div key={dayIndex} className="flex-1 bg-muted-foreground/10" />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (weeks.length === 0) {
    return null;
  }

  return (
    <svg
      className={className}
      viewBox={`0 0 ${weeks.length} 7`}
      preserveAspectRatio="none"
    >
      {weeks.map((week, weekIndex) =>
        week.map(
          (level, dayIndex) =>
            level > 0 && (
              <rect
                key={`${weekIndex}-${dayIndex}`}
                x={weekIndex}
                y={dayIndex}
                width={1}
                height={1}
                className={levelFill(level)}
              />
            )
        )
      )}
    </svg>
  );
}
