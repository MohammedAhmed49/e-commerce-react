import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/cart/cart.actions';
import { selectCartItems } from '../../store/cart/cart.selector';
import Button from '../button/button.component';
import './product-card.styles.scss';

const ProductCard = ({ product }) => {
    const cartItems = useSelector(selectCartItems);

    const dispatch = useDispatch();

    const AddToCart = (product) => {
        dispatch(addToCart(cartItems, product));
    }

    return (
        <div className='product-card-container'>
            <img src={product.imageUrl}/>
            <div className='footer'>
                <span className='name'>{product.name}</span>
                <span className='price'>{product.price}</span>
            </div>
            <Button buttonType='inverted' onClick={() => AddToCart(product)}>Add to cart</Button>
        </div>
    )
}

export default ProductCard;