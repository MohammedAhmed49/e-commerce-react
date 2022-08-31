import './cart-dropdown.styles.scss';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';

const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();

    return ( 
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
            {
                cartItems.map(item => <CartItem key={item.id} cartItem={item} />)
            }
            </div>
            
            <Button onClick={() => navigate('checkout')}>Go to checkout</Button>
        </div>
    )
}

export default CartDropdown;