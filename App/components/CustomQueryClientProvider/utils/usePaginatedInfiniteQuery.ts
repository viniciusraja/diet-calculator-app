import {
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { ResultPaginated } from "./paginatedTypes";

const usePaginatedInfiniteQuery = <ResultType = unknown>({
  enabled = true,
  ...rest
}: Omit<
  UseInfiniteQueryOptions,
  "getNextPageParam" | "initialPageParam"
>): UseInfiniteQueryResult<ResultType> => {
  const queryResult = useInfiniteQuery({
    getNextPageParam: (lastPage) => {
      const lastPageFetched = lastPage as ResultPaginated<ResultType[]>;
      const maxPageNumber = lastPageFetched?.page_info?.total_pages;
      const nextPage = lastPageFetched?.page_info?.page + 1;
      return nextPage <= maxPageNumber ? nextPage : undefined;
    },
    ...rest,
    initialPageParam: 0,
    enabled,
  }) as UseInfiniteQueryResult<ResultType>;

  return queryResult;
};

export default usePaginatedInfiniteQuery;
