export function getExternalLinkProps(href: string) {
  if (!href.startsWith("http")) return {};

  return {
    target: "_blank" as const,
    rel: "noopener noreferrer" as const,
  };
}
