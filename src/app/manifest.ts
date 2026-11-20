import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ayushi Diyora | Frontend Developer",
    short_name: "Ayushi",
    description:
      "Portfolio of Ayushi Diyora, a Frontend Developer specializing in React.js, Next.js, and TypeScript.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8fafc",
    theme_color: "#0f172a",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
