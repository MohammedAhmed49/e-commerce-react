// import { useContext } from 'react';
import { useSelector } from 'react-redux';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import PaymentForm from '../../components/payment-form/payment-form.component';
import { selectCartItems, selectTotal } from '../../store/cart/cart.selector';
import './checkout.styles.scss';

const Checkout = () => {
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectTotal);

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
                    {cartItems.map(item => <CheckoutItem key={item.id} cartItem={item} />)}
                </div>

                <div className="checkout-table__total">
                    <h2>Total: ${cartTotal}</h2>
                </div>
                <PaymentForm />
            </div>
        </div>
    )

}

export default Checkout;