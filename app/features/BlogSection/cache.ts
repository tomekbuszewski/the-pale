import { readFileSync, writeFileSync } from "fs";

import type { BlogPost } from "@common-types/Blogpost";

export const cache = new Map<string, BlogPost>();

// Custom serialization function
function serializeCache(cache: Map<string, BlogPost>): string {
  const serialized = Array.from(cache.entries()).map(([key, value]) => ({
    key,
    value: {
      ...value,
      // Handle non-serializable data here (e.g., convert Date to string)
      date: value.date instanceof Date ? value.date.toISOString() : value.date,
    },
  }));
  return JSON.stringify(serialized);
}

// Custom deserialization function
function deserializeCache(json: string): Map<string, BlogPost> {
  const parsed = JSON.parse(json) as { key: string; value: BlogPost }[];
  const map = new Map<string, BlogPost>();
  parsed.forEach(({ key, value }) => {
    // Handle non-serializable data here (e.g., convert string back to Date)
    if (value.date) value.date = new Date(value.date);
    map.set(key, value);
  });
  return map;
}

// Save cache to file
export function saveCacheToFile(filePath: string) {
  const json = serializeCache(cache);
  writeFileSync(filePath, json);
}

// Load cache from file
export function loadCacheFromFile(filePath: string) {
  try {
    const json = readFileSync(filePath, "utf-8");
    const loadedCache = deserializeCache(json);
    cache.clear(); // Clear existing cache
    loadedCache.forEach((value, key) => cache.set(key, value));
  } catch (error) {
    console.error("Failed to load cache from file:", error);
  }
}
