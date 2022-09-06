import {
  Routes,
  Route
} from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCategoriesStart } from "./store/categories/categories.actions";
import { checkUserSession } from "./store/user/user.actions";
import Spinner from "./components/spinner/spinner.component";

const Home = lazy(() => import('./routes/home/home.component'));
const Navigation = lazy(() => import('./routes/navigation/navigation.component'));
const Authentication = lazy(() => import('./routes/auth/auth.component'));
const Shop = lazy(() => import('./routes/shop/shop.component'));
const Category = lazy(() => import('./routes/category/category.component'));
const Checkout = lazy(() => import('./routes/checkout/checkout.component'));


const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
}, []);

  useEffect(() => {
      dispatch(fetchCategoriesStart());
  }, []);

  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop">
            <Route index element={<Shop />}/>
            <Route path=":cateName" element={<Category />}/>
          </Route>
          <Route path="auth" element={<Authentication />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App;