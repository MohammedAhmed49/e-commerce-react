import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import Button from '../button/button.component';
import './product-card.styles.scss';

const ProductCard = ({ product }) => {
    const { addToCart } = useContext(CartContext);

    return (
        <div className='product-card-container'>
            <img src={product.imageUrl}/>
            <div className='footer'>
                <span className='name'>{product.name}</span>
                <span className='price'>{product.price}</span>
            </div>
            <Button buttonType='inverted' onClick={() => addToCart(product)}>Add to cart</Button>
        </div>
    )
}

export default ProductCard;