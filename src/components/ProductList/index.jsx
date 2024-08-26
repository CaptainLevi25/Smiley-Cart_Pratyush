import React, { useEffect, useState } from "react";
import { Spinner, Typography } from "neetoui";
import productsApi from "apis/products";
import ProductListItem from "./ProductListItem";
import Header from "components/commons/Header";
import { Input } from "neetoui";
import { Search } from "neetoicons";
import { without } from "ramda";
import useDebounce from "hooks/useDebounce";
import withTitle from "utils/withTitle";
const ProductList = () => {
  const [cartItems, setCartItems] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const debouncedSearchKey = useDebounce(searchKey);
  const toggleIsInCart = slug =>
    setCartItems(prevCartItems =>
      prevCartItems.includes(slug)
        ? without([slug], cartItems)
        : [slug, ...cartItems]
    );
  const fetchProducts = async () => {
    try {
      const { products } = await productsApi.fetch({ searchTerm: debouncedSearchKey });
      setProducts(products);
    } catch (error) {
      console.log("An error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
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
            onChange={event => setSearchKey(event.target.value)}
          />
        }
      />
      <div className="flex flex-col">
        <div className="grid grid-cols-2 justify-items-center gap-y-8 p-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map(product => (
            <ProductListItem key={product.slug} {...product}  isInCart={cartItems.includes(product.slug)}  toggleIsInCart={() => toggleIsInCart(product.slug)} />
          ))}
        </div>
      </div>
    </>
  );
};

export default withTitle(ProductList, "Product List");
