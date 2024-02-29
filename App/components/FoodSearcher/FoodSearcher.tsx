import {
  Box,
  FlatList,
  HStack,
  Spinner,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import CustomInput from "../CustomInput/CustomInput";
import useFoodItemsQuery from "./query/useFoodItemsQuery";
import { useWatch } from "react-hook-form";
import mergeInfiniteQueryPages from "../CustomQueryClientProvider/utils/mergeInfinitePages";
import { useMemo } from "react";

const FoodSearcher = () => {
  const foodSear = useWatch({ name: "foodItemSearcher" });

  const { data, status, isLoading, error, fetchNextPage } = useFoodItemsQuery({
    foodNameSearch: foodSear,
    isInfinityQuery: true,
  });

  const paginatedData = useMemo(
    () => mergeInfiniteQueryPages(data?.pages || []),
    [data?.pages]
  );

  return (
    <Box justifyContent="center">
      <VStack justifyContent="center" alignItems="center">
        <CustomInput name="foodItemSearcher" />
        {isLoading ? (
          <Spinner size="small" />
        ) : (
          <FlatList
            height={60}
            maxHeight={200}
            data={paginatedData}
            keyExtractor={(item) => item?.id}
            onEndReached={fetchNextPage}
            onEndReachedThreshold={0.3}
            renderItem={(data) => (
              <HStack height={30} space="sm">
                <Text>{data?.item?.name}</Text>
                <Text>{data?.item?.calories}</Text>
                <Text>{data?.item?.cookingMethodCode}</Text>
              </HStack>
            )}
          />
        )}
      </VStack>
    </Box>
  );
};

export default FoodSearcher;
