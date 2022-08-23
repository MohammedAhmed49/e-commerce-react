import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import "./checkout-item.styles.scss";

const CheckoutItem = ({ cartItem }) => {
  const { imageUrl, name, price, quantity, id } = cartItem;
  const { removeCartItem, decreaseItemQuantity, increaseItemQuantity } = useContext(CartContext);

  const removeItem = () => {
    removeCartItem(id);
  };

  const increaseQuantity = () => {
    increaseItemQuantity(id);
  };

  const decreaseQuantity = () => {
    decreaseItemQuantity(id);
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
