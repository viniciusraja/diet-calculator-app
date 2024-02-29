const foodItemKeys = {
  all: "foods/foodItem" as const,
  list: (filters: {}) => [foodItemKeys.all, "list", { filters }] as const,
  infiniteList: (filters: {}) =>
    [foodItemKeys.all, "list", "infinite", { filters }] as const,
  searchByFoodName: (queryKey: string, filters: {}) =>
    [`${foodItemKeys.all}${queryKey}`, { filters }] as const,
};
export default foodItemKeys;
