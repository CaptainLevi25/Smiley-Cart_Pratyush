import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useEffect } from "react";

import productsApi from "apis/products";
import Header from "components/commons/Header";
import { isEmpty, keys } from "ramda";
import useCartItemsStore from "stores/useCartItemsStore";
import { shallow } from "zustand/shallow";
import { Spinner } from "@bigbinary/neetoui";
import ProductCard from "./ProductCard";
import { cartTotalOf } from "components/utils";
import PriceCard from "./PriceCard";
import withTitle from "utils/withTitle";

const Cart = () => {
const { cartItems, setSelectedQuantity } = useCartItemsStore();
const slugs = keys(cartItems);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchCartProducts = async () => {
    try {
      const responses = await Promise.all(
        slugs.map(slug => productsApi.show(slug))
      );

      setProducts(responses);

      responses.forEach(({ availableQuantity, name, slug }) => {
        if (availableQuantity >= cartItems[slug]) return;

        setSelectedQuantity(slug, availableQuantity);
        if (availableQuantity === 0) {
          Toastr.error(
            `${name} is no longer available and has been removed from cart`,
            {
              autoClose: 2000,
            }
          );
        }
      });
    } catch (error) {
      console.log("An error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCartProducts();
  }, [cartItems]);


const totalMrp = cartTotalOf(products, "mrp");
const totalOfferPrice = cartTotalOf(products, "offerPrice");

  if (isLoading) return <Spinner />;
  if (isEmpty(products)) {
    return (
      <>

        <Header title="My Cart" />
        <div className="flex h-screen items-center justify-center">
          <h1>Your cart is empty!</h1>
        </div>
      </>
    );
  }
  return (
    <>
      <Header title="My Cart" />
      <div className="mt-10 flex justify-center space-x-10">
        <div className="w-1/3 space-y-5">
          {products.map(product => (
            <ProductCard key={product.slug} {...product} />
          ))}
        </div>
        {totalMrp > 0 && (
          <div className="w-1/4">
            <PriceCard {...{ totalMrp, totalOfferPrice }} />
          </div>
        )}
      </div>
    </>
  );

};

export default withTitle(Cart, "My Cart");