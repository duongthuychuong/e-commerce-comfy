import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
    };
  }
  if (action.type === SET_GRIDVIEW) {
    return {
      ...state,
      gridview: true,
    };
  }
  if (action.type === SET_LISTVIEW) {
    return {
      ...state,
      gridview: false,
    };
  }
  if (action.type === UPDATE_SORT) {
    return {
      ...state,
      sort: action.payload,
    };
  }
  if (action.type === SORT_PRODUCTS) {
    const { filtered_products, sort } = state;
    let tempProducts = [...filtered_products];
    console.log(tempProducts);
    switch (sort) {
      case "price-lowest":
        tempProducts = tempProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-highest":
        tempProducts = tempProducts.sort((a, b) => b.price - a.price);
        break;
      case "name-a":
        tempProducts = tempProducts.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        break;
      case "name-z":
        tempProducts = tempProducts.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
        break;
    }
    return {
      ...state,
      filtered_products: tempProducts,
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
