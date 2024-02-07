/* eslint-disable camelcase */
type Pagination = {
  page: number;
  total_count: number;
  limit: number;
  total_pages: number;
};

export interface ResultPaginated<T> {
  page_info: Pagination;
  results: T;
}
