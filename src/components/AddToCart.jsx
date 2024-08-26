import React, { useContext } from "react";
import { useState } from "react";
import { without } from "ramda";
import { Button } from "neetoui";
import { isNil, paths } from "ramda";
import CartItemsContext from "src/contexts/CartItemsContext";
import useCartItemsStore from "stores/useCartItemsStore";
import { shallow } from "zustand/shallow";
import ProductQuantity from "./commons/ProductQuantity";
import useSelectedQuantity from "./hooks/useSelectedQuantity";

const AddToCart = ({ slug  }) => {
  //const [cartItems, setCartItems] = useContext(CartItemsContext);
  const { selectedQuantity, setSelectedQuantity } = useSelectedQuantity(slug);
  const handleClick = e => {
    e.stopPropagation();
    e.preventDefault();
    setSelectedQuantity(1);
  };


  if (isNil(selectedQuantity)) {
    return <Button label="Add to cart" size="large" onClick={handleClick} />;
  }
  return <ProductQuantity {...{ slug  }} />;
};

export default AddToCart;
