import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import CartItem from "../../models/cart-item";

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const productPrice = addedProduct.price;
      const productTitle = addedProduct.title;

      let updatedOrNewCartItem;

      if (state.items[addedProduct.id]) {
        //already know the item is in cart
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          productPrice,
          productTitle,
          state.items[addedProduct.id].totalAmount + productPrice
        );
      } else {
        updatedOrNewCartItem = new CartItem(1, productPrice, productTitle, productPrice);
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + productPrice,
      };
    case REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.productId];
      const currentQty = selectedCartItem.quantity;
      let updatedCartItems;

      if (currentQty > 1) {
        //need to reduce it by 1, not erase it
        updatedCartItem = new CartItem(
          currentQty - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.totalAmount - selectedCartItem.productPrice
        );
        updatedCartItems = { ...state.items, [action.productId]: updatedCartItem };
      } else {
        //erase it from cart, so clone state with ...state.items
        updatedCartItems = { ...state.items };
        //to remove use delete keyword (JS knows this)
        delete updatedCartItems[action.productId];
      }
      return { ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice
       };
  }
  return state;
};
