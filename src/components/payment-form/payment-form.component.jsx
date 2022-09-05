import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Button from "../button/button.component";
import './payment-form.styles.scss';


const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const paymentHandler = async (e) => {
        e.preventDefault();
        if( !stripe || !elements ) return;

        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount: 1000 })
        }).then(res => res.json());

        const clientSecret = response.paymentIntent.client_secret;


        const payment = await stripe.confirmCardPayment(clientSecret,{
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: 'Mohammed Ahmed'
                }
            }
        });

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
                <Button buttonType='inverted'>Pay Now</Button>
            </form>
        </div>
    )
}

export default PaymentForm;