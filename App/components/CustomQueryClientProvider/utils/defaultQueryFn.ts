import { ResponseType } from "axios";
import api from "./api";
import { QueryFunctionContext } from "@tanstack/react-query";

export type QueryKeyFilters = [{ filters: string }];

type DefaultQueryFn = {
  meta?: { responseType?: ResponseType };
  pageNumber?: number;
} & QueryFunctionContext;

const defaultQueryFn = async ({
  queryKey,
  pageNumber,
  meta,
}: DefaultQueryFn) => {
  const [queryParam] = queryKey as string[];
  const [filters] = queryKey?.filter(
    (key: any) => typeof key === "object"
  ) as QueryKeyFilters;
  const { responseType } = meta || {};

  const filtersToApply = filters?.filters || {};
  console.log({ queryKey });

  const { data } = await api.get(queryParam, {
    responseType,
    params: {
      ...filtersToApply,
      _page: pageNumber,
    },
  });

  return data || {};
};
export default defaultQueryFn;
