import { assoc, dissoc } from "ramda";
import { create } from "zustand";
import { isNotEmpty } from "neetocist";
const useCartItemsStore = create(set => ({
  cartItems: {},
  setSelectedQuantity: (slug, quantity) =>
    set(({ cartItems }) => {
      if (quantity <= 0 && isNotEmpty(quantity)) {
        return { cartItems: dissoc(slug, cartItems) };
      }

      return { cartItems: assoc(slug, String(quantity), cartItems) };
    }),
}));

export default useCartItemsStore;