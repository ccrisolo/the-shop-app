import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
//create new const SET_PRODUCT for getting products from the server and setting in the redux store
export const SET_PRODUCTS = "SET_PRODUCTS";

// below is how we GET the products from the server
export const fetchProducts = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    //wrap code block in try catch block to catch errors
    try {
      //any async code can go here before the action is dispatched
      //send http request using fetch API by entering url to your DB
      const response = await fetch(
        "https://the-shop-app-64312.firebaseio.com/products.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      const loadedProducts = [];

      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            "u1",
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }

      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts,
        userProducts: loadedProducts.filter((prod) => prod.ownerId === userId),
      });
    } catch (err) {
      //send to custom analytics server
      throw err;
    }
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://the-shop-app-64312.firebaseio.com/products/${productId}.json?auth=${token}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    dispatch({ type: DELETE_PRODUCT, pid: productId });
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  //redux thunk dispatch syntax below to allow async code to run
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId; //using const userId in the  response body below maps products to logged in user
    //any async code can go here before the action is dispatched
    //send http request using fetch API by entering url to your DB
    //2nd arguement will me an object stating the method(i.e. GET, PUT, POST), headers and body contents
    const response = await fetch(
      `https://the-shop-app-64312.firebaseio.com/products.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({
          title,
          description,
          price,
          imageUrl,
          ownerId: userId,
        }),
      }
    );

    const resData = await response.json();

    console.log(resData);

    //dispatch won't run until all code above has finished
    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        //to access id created by firebase, use resData
        id: resData.name,
        title,
        description,
        imageUrl,
        price,
        ownerId: userId,
      },
    });
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  //adding getState as 2nd arg after dispatch gets us acceess to the current state in redux store
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://the-shop-app-64312.firebaseio.com/products/${id}.json?auth=${token}`, //using ${token} appends token to fetch call validating the user so they can edit a product
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl,
      },
    });
  };
};
