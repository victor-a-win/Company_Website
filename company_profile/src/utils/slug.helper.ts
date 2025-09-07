const getUUIDFromSlug = (slug: string, splitter: string = "-"): string => {
  if (!slug) return "";
  const parts = slug.trim().split(splitter);
  return parts.length >= 5 ? parts.slice(-5).join("-") : "";
};

export { getUUIDFromSlug };
