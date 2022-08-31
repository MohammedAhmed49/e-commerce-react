import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseItemQuantity, removeCartItem } from "../../store/cart/cart.actions";
import { selectCartItems } from "../../store/cart/cart.selector";

import "./checkout-item.styles.scss";

const CheckoutItem = ({ cartItem }) => {
  const { imageUrl, name, price, quantity, id } = cartItem;
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const removeItem = () => {
    dispatch(removeCartItem(cartItems, id));
  };

  const increaseQuantity = () => {
    dispatch(addToCart(cartItems, cartItem));
  };

  const decreaseQuantity = () => {
    dispatch(decreaseItemQuantity(cartItems, id));
  };

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>

      <span className="name">{name}</span>
      <span className="quantity">
        <span className="arrow" onClick={decreaseQuantity}>&#10094;</span>
        <span className="value">{quantity}</span>
        <span className="arrow" onClick={increaseQuantity}>&#10095;</span>
      </span>
      <span className="price">{price}</span>
      <span className="remove-button" onClick={removeItem}>&#10005;</span>
    </div>
  );
};

export default CheckoutItem;
