import { useContext } from 'react';
import { ReactComponent as Icon } from '../../assets/shopping-bag.svg';
import { CartContext } from '../../context/cart.context';
import './cart-icon.styles.scss';

const CartIcon = () => {
    const { cartOpened, setCartOpened, totalQuantity } = useContext(CartContext);
    
    return(
        <div className='cart-icon-container' onClick={() => setCartOpened(!cartOpened)}>
            <Icon className='shopping-icon'/>
            <span className='item-count'>{totalQuantity}</span>
        </div>
    )
}

export default CartIcon;