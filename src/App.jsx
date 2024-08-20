import React from "react";
import { useState } from "react";
import { Link, Route, Switch } from "react-router-dom";
import routes from "routes";
import Product from "./components/Product";
import PageNotFound from "components/PageNotFound";
import { NavLink, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import ProductList from "components/ProductList";
import CartItemsContext from "./contexts/CartItemsContext";
import Cart from "components/Cart";
const App = () => {
  const [cartItems, setCartItems] = useState([]);
  return (
    <>

      <div className="flex space-x-2">
        <NavLink exact activeClassName="underline font-bold" to="/">
          Home
        </NavLink>
        <NavLink exact activeClassName="underline font-bold" to="/product">
          Product
        </NavLink>
      </div>
      <Switch>
        <Route exact component={Product} path={routes.products.show} />
        <Route exact component={ProductList} path={routes.products.index} />
        <Route exact component={Cart} path={routes.cart} />
        <Redirect exact from={routes.root} to={routes.products.index} />
        <Route component={PageNotFound} path="*" />
      </Switch>

      </>
  );
};

export default App;
