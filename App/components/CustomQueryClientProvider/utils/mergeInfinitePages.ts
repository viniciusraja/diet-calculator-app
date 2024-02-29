import { ResultPaginated } from "./paginatedTypes";

const mergeInfiniteQueryPages = <ResultType = unknown>(
  pages: ResultPaginated<ResultType[]>[]
) => pages?.reduce<ResultType[]>((acc, { data = [] }) => [...acc, ...data], []);

export default mergeInfiniteQueryPages;
