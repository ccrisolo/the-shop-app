export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const deleteProduct = (productId) => {
  return { type: DELETE_PRODUCT, pid: productId };
};

export const createProduct = (title, description, imageUrl, price) => {
  //redux thunk dispatch syntax below to allow async code to run
  return async (dispatch) => {
    //any async code can go here before the action is dispatched
    //send http request using fetch API by entering url to your DB
    //2nd arguement will me an object stating the method(i.e. GET, PUT, POST)
    const response = await fetch('https://the-shop-app-64312.firebaseio.com/products.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json'
      },
      body: JSON.stringify({
        title, 
        description,
        price,
        imageUrl
      })
    }); 

    const resData = await response.json();

    console.log(resData);

    //dispatch won't run until all code above has finished
    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        title,
        description,
        imageUrl,
        price,
      },
    });
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return {
    type: UPDATE_PRODUCT,
    pid: id,
    productData: {
      title,
      description,
      imageUrl,
    },
  };
};
