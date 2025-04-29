// src/lib/rawg.ts
export const RAWG_BASE = "https://api.rawg.io/api";

export async function rawgFetch<T>(
  endpoint: string,
  params: Record<string, string | number | boolean | undefined> = {}
): Promise<T> {
  // API-Key aus der env holen
  const key = import.meta.env.VITE_RAWG_KEY;
  if (!key) throw new Error("RAWG-Key fehlt!");

  const searchParams = new URLSearchParams(
    Object.entries({ key, ...params }).filter(([, v]) => v !== undefined) as any
  );

  const url = `${RAWG_BASE}/${endpoint}?${searchParams.toString()}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`RAWG-Error ${res.status}`);
  return (await res.json()) as T;
}
