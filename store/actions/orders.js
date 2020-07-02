export const ADD_ORDER = "ADD_ORDER";

export const addOrder = (cartItems, totalAmount) => {
  const date = new Date();
  return async (dispatch) => {
    const response = await fetch(
      "https://the-shop-app-64312.firebaseio.com/orders/u1.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString(),
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();
    
    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.name,
        date: date,
        items: cartItems,
        amount: totalAmount,
      },
    });
  };
};
