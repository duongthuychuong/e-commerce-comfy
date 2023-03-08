import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { ProductsProvider } from "./context/products_context";
import { FilterProvider } from "./context/filter_context";
import { CartProvider } from "./context/cart_context";
import { UserProvider } from "./context/user_context";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
/* 9kqTVUmMoDWd4C5rVJg3Joy1RgKaDcl2
Rq2Yw15cag1F-fBw81Mvma4k9NRgR0nmfCqfe3s6sp8zYPZLngVsqKenrrhbjb4z */
root.render(
  <Auth0Provider
    domain="dev-jc62e0k1on4sbsux.us.auth0.com"
    clientId="9kqTVUmMoDWd4C5rVJg3Joy1RgKaDcl2"
    redirect_uri={window.location.origin}
    cacheLocation="localstorage"
  >
    <UserProvider>
      <ProductsProvider>
        <FilterProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </FilterProvider>
      </ProductsProvider>
    </UserProvider>
  </Auth0Provider>
);
