import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/dashboard/",
          "/seller/",
          "/claim/",
          "/agent-guide/",
          "/skills/",
          "/audit/",
        ],
      },
    ],
    sitemap: "https://opencreditai.com/sitemap.xml",
  };
}
