export type EngineSearch = {
  flour?: string;
};

export function parseEngineSearch(raw: Record<string, unknown>): EngineSearch {
  return {
    flour:
      typeof raw.flour === "string" && raw.flour.length > 0
        ? raw.flour
        : undefined,
  };
}

export function hasEngineQuery(search: EngineSearch) {
  return Boolean(search.flour);
}
