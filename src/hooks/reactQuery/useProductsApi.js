import { QUERY_KEYS } from "constants/query";
import { useQuery } from "react-query";
import productsApi from "apis/products";

export const useShowProduct = slug =>
  useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, slug],
    queryFn: () => productsApi.show(slug),
  });