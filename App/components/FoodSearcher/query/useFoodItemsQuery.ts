import { useQuery } from "@tanstack/react-query";
import useDebounce from "../../CustomQueryClientProvider/utils/useDebounce";
import foodItemKeys from "./foodItemQueryKeys";
import usePaginatedInfiniteQuery from "../../CustomQueryClientProvider/utils/usePaginatedInfiniteQuery";

type useFoodItemsQueryProps = {
  debounce?: number;
  pageLimit?: number;
  foodNameSearch?: string | null;
  order?: string;
  isInfinityQuery?: boolean;
  enabled?: boolean;
};

const useFoodItemsQuery = ({
  debounce = 500,
  foodNameSearch = null,
  order,
  enabled = true,
  isInfinityQuery,
}: useFoodItemsQueryProps) => {
  const staleTime = 2 * 60 * 60;
  const debouncedFoodNameSearch = useDebounce(foodNameSearch, debounce);

  const possibleFilters = {
    foodName: debouncedFoodNameSearch,
    order,
  };

  const infiniteQueryResult = usePaginatedInfiniteQuery({
    queryKey: foodItemKeys.infiniteList(possibleFilters),
    enabled: isInfinityQuery && enabled,
    staleTime,
  });

  const queryResult = useQuery({
    queryKey: foodItemKeys.list(possibleFilters),
    enabled: isInfinityQuery && enabled,
    staleTime,
  });

  return isInfinityQuery ? infiniteQueryResult : queryResult;
};

export default useFoodItemsQuery;
