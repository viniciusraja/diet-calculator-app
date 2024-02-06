import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactElement, useRef } from "react";

type CustomQueryClientProviderProps = {
  children: ReactElement;
};

const CustomQueryClientProvider = ({
  children,
}: CustomQueryClientProviderProps) => {
  const queryClient = useRef(
    new QueryClient({
      defaultOptions: {
        queries: {
          //   queryFn: defaultQueryFn,
          staleTime: 5 * 60 * 1000,
        },
      },
    })
  );
  return (
    <QueryClientProvider client={queryClient.current}>
      {children}
    </QueryClientProvider>
  );
};

export default CustomQueryClientProvider;
