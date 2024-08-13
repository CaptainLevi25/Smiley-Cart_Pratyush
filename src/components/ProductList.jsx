import React, { useEffect, useState } from "react";
import { Spinner, Typography } from "neetoui";
import productsApi from "apis/products";
import ProductListItem from "./ProductListItem";
const ProductList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const { products } = await productsApi.fetch();
      setProducts(products);
    } catch (error) {
      console.log("An error occurred:", error);
    }finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


if (isLoading) {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Spinner />
    </div>
  );
}
    return(
  <div className="flex flex-col">
    <div className="m-2">
      <Typography className="mx-6 mb-2 mt-6" style="h1" weight="semibold">
        Smile Cart
      </Typography>
      <hr className="neeto-ui-bg-black h-1" />
    </div>
    <div className="grid grid-cols-2 justify-items-center gap-y-8 p-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map(product => (
          <ProductListItem key={product.slug} {...product} />
        ))}
      </div>
  </div>
)};

export default ProductList;