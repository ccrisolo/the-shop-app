export const ADD_ORDER = 'ADD_ORDER';


//this is an action creator
export const addOrder = (cartItems, totalAmount) => {
  return {
    type: ADD_ORDER,
    orderData: { items: cartItems, amount: totalAmount }
  };
};