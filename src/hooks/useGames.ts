import { useInfiniteQuery, InfiniteData } from "@tanstack/react-query";
import { rawgFetch } from "../lib/rawg";
import { GamesResponse } from "../types/rawg";

export function useGames(search = "") {
  return useInfiniteQuery<
    GamesResponse,                     
    Error,                              
    InfiniteData<GamesResponse, number>, 
    ["games", string],                  
    number                               
  >({
    queryKey: ["games", search] as const,
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      rawgFetch("games", {
        page: pageParam,
        page_size: 50,
        search,
        search_precise: true, 
        search_exact: true,
        ordering: "-rating",
    }),
    getNextPageParam: (lastPage, _pages, lastPageParam) =>
      lastPage.next ? lastPageParam + 1 : undefined,
    staleTime: 5 * 60 * 1000,
  });
}
