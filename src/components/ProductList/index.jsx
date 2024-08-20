import React, { useEffect, useState } from "react";
import { Spinner, Typography } from "neetoui";
import productsApi from "apis/products";
import ProductListItem from "./ProductListItem";
import Header from "components/commons/Header";
import { Input } from "neetoui";
import { Search } from "neetoicons";
const ProductList = () => {
  const [searchKey, setSearchKey] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const { products } = await productsApi.fetch({ searchTerm: searchKey });
      setProducts(products);
    } catch (error) {
      console.log("An error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchKey]);

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
            <ProductListItem key={product.slug} {...product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductList;
