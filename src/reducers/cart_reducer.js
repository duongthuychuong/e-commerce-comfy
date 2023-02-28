import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload;
    const findedItem = state.cart.find((item) => id + color === item.id);
    if (findedItem) {
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === id + color) {
          let newAmount = cartItem.amount + amount;
          if (newAmount > cartItem.max) {
            newAmount = cartItem.max;
          }
          return {
            ...cartItem,
            amount: newAmount,
          };
        } else {
          return cartItem;
        }
      });
      return {
        ...state,
        cart: tempCart,
      };
    } else {
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      };
      return {
        ...state,
        cart: [...state.cart, newItem],
      };
    }
  }
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload;
    const updateItem = state.cart.find((item) => item.id === id);
    if (updateItem) {
      const tempCart = state.cart.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            amount: value,
          };
        }
        return item;
      });
      return {
        ...state,
        cart: tempCart,
      };
    }
    return {
      state,
    };
  }

  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter((item) => item.id !== action.payload);
    return {
      ...state,
      cart: tempCart,
    };
  }
  if (action.type === CLEAR_CART) {
    return {
      ...state,
      cart: [],
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
