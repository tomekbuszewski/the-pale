import { readFileSync, writeFileSync } from "fs";

import type { BlogPost } from "@common-types/Blogpost";

export const cache = new Map<string, BlogPost>();
