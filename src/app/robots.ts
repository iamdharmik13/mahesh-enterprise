import { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/auth/dashboard"] },
    sitemap: "https://maheshenterprise.vercel.app/sitemap.xml",
  };
}
