import React from 'react';
import { ErrorBoundary } from './components/errorBoundary';
import { CategoryPage } from './pages/listpage';
import { CartPage } from './pages/cartpage';
import { ProductPage } from './pages/productpage';
import { Switch, Route } from 'react-router-dom';
import { ProductRoute, CartRoute } from './constants';

export default function App() {
  return (
    <div>
      <Switch>
        <Route path={CartRoute}>
          <ErrorBoundary
            fallback={() => (
              <h3>Could not load the cart page! Please try again</h3>
            )}
          >
            <CartPage />
          </ErrorBoundary>
        </Route>
        <Route path={ProductRoute}>
          <ErrorBoundary
            fallback={() => (
              <h3>Could not load the product page! Please try again</h3>
            )}
          >
            <ProductPage />
          </ErrorBoundary>
        </Route>
        <Route path="/">
          <ErrorBoundary
            fallback={() => (
              <h3>Could not load the category page! Please try again</h3>
            )}
          >
            <CategoryPage />
          </ErrorBoundary>
        </Route>
      </Switch>
    </div>
  );
}
