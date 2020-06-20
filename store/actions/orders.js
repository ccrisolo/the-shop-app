export const ADD_ORDER = "ADD_ORDER";

//make action creator
export const addOrder = (cartItems, totalAmount) => {
  return {
    type: ADD_ORDER,
    orderData: { items: cartItems, totalAmount: totalAmount },
  };
};
