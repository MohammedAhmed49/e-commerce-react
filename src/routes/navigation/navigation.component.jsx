import { Outlet, Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import { customSignOut } from "../../utils/firebase/firebase.utils";
import { useSelector } from "react-redux";

import "./navigation.styles.scss";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectCartOpened } from "../../store/cart/cart.selector";

const Navigation = () => {
  const cartOpened = useSelector(selectCartOpened)

  const currentUser = useSelector(selectCurrentUser);

  const signOutHandler = async () => {
    await customSignOut();
  }

  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <Logo className="logo" />
        </Link>

        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            Shop
          </Link>

          {currentUser ? (
            <span onClick={signOutHandler} className="nav-link" to="/auth">
              Sign Out
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              Sign in
            </Link>
          )}

          <CartIcon />
        </div>
      </div>
      {cartOpened ? <CartDropdown /> : null}
      <Outlet />
    </>
  );
};

export default Navigation;
