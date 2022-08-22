import './cart-item.styles.scss';

const CartItem = ({ cartItem }) => {
    return (
        <div>
            <h2>{cartItem.name}</h2>
            <span>{cartItem.quantity}</span>
        </div>
    )
}

export default CartItem;