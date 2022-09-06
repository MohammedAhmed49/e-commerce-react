import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import Button from "../button/button.component";
import './payment-form.styles.scss';


const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const amount = useSelector(selectTotal);
    const currentUser = useSelector(selectCurrentUser);

    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    const paymentHandler = async (e) => {
        e.preventDefault();
        setIsProcessingPayment(true);
        if( !stripe || !elements ) return;

        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount: amount * 100 })
        }).then(res => res.json());

        const clientSecret = response.paymentIntent.client_secret;

        const payment = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: currentUser ? currentUser.displayName : 'Guest'
                    }
                }
            });

        setIsProcessingPayment(false);

        if (payment.error) {
            alert(payment.error)
        } else {
            if( payment.paymentIntent.status === 'succeeded' ) {
                alert('Payment Succeeded');
            }
        }
    }
    return(
        <div className="payment-form-container">
            <form className="form-container" onSubmit={paymentHandler}>
                <h2>Credit Card Payment: </h2>
                <CardElement />
                <Button disabled={isProcessingPayment} buttonType='inverted'>Pay Now</Button>
            </form>
        </div>
    )
}

export default PaymentForm;