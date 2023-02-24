import { ShippingAddressElement } from "@stripe/react-stripe-js";
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
    const priceArray = action.payload.map((product) => product.price);
    const maxPrice = Math.max(...priceArray);
    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: {
        ...state.filters,
        max_price: maxPrice,
        price: maxPrice,
      },
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
  if (action.type === UPDATE_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        [action.payload.name]: action.payload.value,
      },
    };
  }
  if (action.type === FILTER_PRODUCTS) {
    // console.log("filtering");
    const { all_products } = state;
    const { text, category, company, color, price, shipping } = state.filters;
    let tempProducts = [...all_products];
    //filtering
    if (text) {
      tempProducts = tempProducts.filter((product) => {
        return product.name.toLowerCase().startsWith(text);
      });
    }
    if (category !== "all") {
      tempProducts = tempProducts.filter((product) => {
        return product.category === category;
      });
    }

    if (company !== "all") {
      tempProducts = tempProducts.filter((product) => {
        return product.company === company;
      });
    }

    if (color !== "all") {
      tempProducts = tempProducts.filter((product) => {
        return product.colors.some((c) => c === color);
      });
    }

    tempProducts = tempProducts.filter((product) => {
      return product.price <= price;
    });

    if (shipping) {
      tempProducts = tempProducts.filter((product) => {
        return product.shipping === shipping;
      });
    }
    return {
      ...state,
      filtered_products: tempProducts,
    };
  }
  if (action.type === SORT_PRODUCTS) {
    const { filtered_products, sort } = state;
    let tempProducts = [...filtered_products];
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
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: "",
        company: "all",
        category: "all",
        color: "all",
        price: state.filters.max_price,
        shipping: false,
      },
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
