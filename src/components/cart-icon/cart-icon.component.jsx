import { ReactComponent as Icon } from '../../assets/shopping-bag.svg';
import { useSelector, useDispatch } from 'react-redux';
import './cart-icon.styles.scss';
import { selectTotalQuantity } from '../../store/cart/cart.selector';
import { setCartOpened } from '../../store/cart/cart.actions';

const CartIcon = () => {
    const totalQuantity = useSelector(selectTotalQuantity);
    const dispatch = useDispatch();

    const toggleCart = () => {
        dispatch(setCartOpened());
    }
    
    return(
        <div className='cart-icon-container' onClick={() => toggleCart()}>
            <Icon className='shopping-icon'/>
            <span className='item-count'>{totalQuantity}</span>
        </div>
    )
}

export default CartIcon;