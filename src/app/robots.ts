import { MetadataRoute } from "next";

export const dynamic = "force-static";

/**
 * Generates robots.txt configuration for search engine crawlers
 * @returns Robots metadata route configuration
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      allow: "/",
      disallow: [],
      userAgent: "*",
    },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
  };
}
