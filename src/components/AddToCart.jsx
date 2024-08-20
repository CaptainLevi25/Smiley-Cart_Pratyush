import React, { useContext } from "react";
import { useState } from "react";
import { without } from "ramda";
import { Button } from "neetoui";
import CartItemsContext from "src/contexts/CartItemsContext";
import useCartItemsStore from "stores/useCartItemsStore";
import { shallow } from "zustand/shallow";

const AddToCart = ({ slug }) => {
  //const [cartItems, setCartItems] = useContext(CartItemsContext);
  const { isInCart, toggleIsInCart } = useCartItemsStore(store => ({
    isInCart: store.cartItems.includes(slug),
    toggleIsInCart: store.toggleIsInCart,
  }),
  shallow
);
  const handleClick = e => {
    e.stopPropagation();
    e.preventDefault();
    toggleIsInCart(slug);
  };

  return (
    <Button
      label={isInCart  ? "Remove from cart" : "Add to cart"}
      size="large"
      onClick={handleClick}
    />
  );
};

export default AddToCart;
