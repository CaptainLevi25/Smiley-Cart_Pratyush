import React, { useEffect, useState } from "react";
import { Spinner, Typography } from "neetoui";
import productsApi from "apis/products";
import ProductListItem from "./ProductListItem";
import Header from "components/commons/Header";
import { Input } from "neetoui";
import { Search } from "neetoicons";
import { mergeLeft, without } from "ramda";
import useDebounce from "hooks/useDebounce";
import withTitle from "utils/withTitle";
import { Pagination } from "neetoui";
import { useHistory } from "react-router-dom";
import { useFetchProducts } from "hooks/reactQuery/useProductsApi";
import { buildUrl } from "utils/url";
import { filterNonNull } from "neetocist";
import useQueryParams from "hooks/useQueryParams";
import routes from "routes";
const ProductList = () => {
  const history = useHistory();
  const queryParams = useQueryParams();
  const { page, pageSize, searchTerm = "" } = queryParams;
   const [cartItems, setCartItems] = useState([]);
  const [searchKey, setSearchKey] = useState("");

 // const [currentPage, setCurrentPage] = useState(1);
  // const [isLoading, setIsLoading] = useState(true);
  // const [products, setProducts] = useState([]);
  const debouncedSearchKey = useDebounce(searchKey);
  const toggleIsInCart = slug =>
    setCartItems(prevCartItems =>
      prevCartItems.includes(slug)
        ? without([slug], cartItems)
        : [slug, ...cartItems]
    );
  const handlePageNavigation = page => {
  //  setCurrentPage(page);
    history.replace(
      buildUrl(
        routes.products.index,
        mergeLeft({ page, pageSize: 8 }, queryParams)
      )
    );
  };
  const fetchProducts = async () => {
    try {
      const { products } = await productsApi.fetch({
        searchTerm: debouncedSearchKey,
      });
      setProducts(products);
    } catch (error) {
      console.log("An error occurred:", error);
    } finally {
      //  setIsLoading(false);
    }
  };
  const productsParams = {
    searchTerm,
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 8,
  };
  const { data: { products = [], totalProductsCount } = {}, isLoading } =
    useFetchProducts(productsParams);

    const updateQueryParams = ({ target: { value } }) => {
      const params = {
        page: 1,
        pageSize: 8,
        searchTerm: value || null,
      };

      setSearchKey(value);

      history.replace(buildUrl(routes.products.index, filterNonNull(params)));
    };

  useEffect(() => {
    //  fetchProducts();
  }, [debouncedSearchKey]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }
  return (
    <>
      <Header
        cartItemsCount={cartItems.length}
        shouldShowBackButton={false}
        title="Smile Cart"
        actionBlock={
          <Input
            placeholder="Search products"
            prefix={<Search />}
            type="search"
            value={searchKey}
            onChange={updateQueryParams}
          />
        }
      />
      <div className="flex flex-col">
        <div className="grid grid-cols-2 justify-items-center gap-y-8 p-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map(product => (
            <ProductListItem
              key={product.slug}
              {...product}
              isInCart={cartItems.includes(product.slug)}
              toggleIsInCart={() => toggleIsInCart(product.slug)}
            />
          ))}
        </div>
      </div>
      <div className="mb-5 self-end">
        <Pagination
          navigate={handlePageNavigation}
          count={totalProductsCount}
          pageNo={Number(page) || DEFAULT_PAGE_INDEX}
          pageSize={Number(pageSize) || DEFAULT_PAGE_SIZE}
        />
      </div>
    </>
  );
};

export default withTitle(ProductList, "Product List");
