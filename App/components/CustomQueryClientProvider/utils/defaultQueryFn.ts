import { ResponseType } from "axios";
import api from "./api";
import { QueryFunctionContext } from "@tanstack/react-query";

export type QueryKeyFilters = [{ filters: string }];

type DefaultQueryFn = {
  meta?: { responseType?: ResponseType };
  pageParam?: number;
} & QueryFunctionContext;

const defaultQueryFn = async ({
  queryKey,
  pageParam,
  meta,
}: DefaultQueryFn) => {
  const [queryParam] = queryKey as string[];
  const [filters] = queryKey?.filter(
    (key: any) => typeof key === "object"
  ) as QueryKeyFilters;

  const { responseType } = meta || {};

  const filtersToApply = filters?.filters || {};

  const { data } = await api.get(queryParam, {
    responseType,
    params: {
      ...filtersToApply,
      page: pageParam,
    },
  });

  return data || {};
};
export default defaultQueryFn;
