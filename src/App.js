import Home from "./routes/home/home.component";
import {
  Routes,
  Route
} from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/auth/auth.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import Category from "./routes/category/category.component";
import { useEffect } from "react";
import { createUserDocumentFromAuth, getCategoriesAndDocuments, onAuthStateChangedListener } from "./utils/firebase/firebase.utils";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./store/user/user.actions";
import { fetchCategoriesAsync, setCategories } from "./store/categories/categories.actions";


const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
      const unsubscribe = onAuthStateChangedListener((user) => {
          if (user) {
              createUserDocumentFromAuth(user);
          }
          dispatch(setCurrentUser(user));
      });

      return unsubscribe;
  }, []);

  useEffect(() => {
      dispatch(fetchCategoriesAsync());
  }, []);

  return (
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
  )
}

export default App;