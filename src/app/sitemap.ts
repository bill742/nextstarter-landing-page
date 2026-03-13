import { MetadataRoute } from "next";

export const dynamic = "force-static";

/**
 * Generates sitemap.xml for search engine indexing
 * @returns Promise resolving to sitemap metadata route configuration
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      lastModified: new Date(),
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
    },
  ];
}
