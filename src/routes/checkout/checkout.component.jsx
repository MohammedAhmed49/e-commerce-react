import { useContext } from 'react';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import { CartContext } from '../../context/cart.context';
import './checkout.styles.scss';

const Checkout = () => {
    const { cartItems, cartTotal } = useContext(CartContext);

    return (
        <div>
            <div className="checkout-table">
                <div className="checkout-table__titles">
                    <span>Product</span>
                    <span>Description</span>
                    <span>Quantity</span>
                    <span>Price</span>
                    <span>Remove</span>
                </div>

                <div className="checkout-table__items">
                    {cartItems.map(item => <CheckoutItem cartItem={item} />)}
                </div>

                <div className="checkout-table__total">
                    <h2>Total: ${cartTotal}</h2>
                </div>
            </div>
        </div>
    )

}

export default Checkout;