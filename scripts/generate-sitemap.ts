import fs from "fs";
import { writeFile } from "fs/promises";

import { PAGE_URL } from "../app/contact";
import getRoutes from "../app/utils/getAllPages";

function getChangeFreq(route: string): string {
  if (route === "/") {
    return "daily"; // Homepage updates frequently with new content
  }

  if (route.includes("/writings/page/")) {
    return "daily"; // Pagination pages change when new posts are added
  }

  if (route.startsWith("/writings/")) {
    return "never"; // Individual blog posts don't change once published
  }

  return "monthly"; // Static pages change occasionally
}

function getUrlPriority(route: string): string {
  if (route === "/") {
    return "1.0";
  }

  if (route.includes("/writings/page/")) {
    return "0.6";
  }

  return "0.8";
}

async function generateSitemap() {
  const routes = await getRoutes();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${PAGE_URL}${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${getChangeFreq(route)}</changefreq>
    <priority>${getUrlPriority(route)}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  fs.writeFileSync("public/sitemap.xml", sitemap);
}

async function generateRobots() {
  const robotsTxt = `User-agent: *
Allow: /
Sitemap: ${PAGE_URL}/sitemap.xml
`;

  return await writeFile("public/robots.txt", robotsTxt);
}

generateSitemap()
  .then(() => {
    console.log("Sitemap generated successfully!");
    generateRobots()
      .then(() => {
        console.log("Robots.txt generated successfully!");
      })
      .catch((error) => console.error(error));
  })
  .catch((error) => console.error(error));
