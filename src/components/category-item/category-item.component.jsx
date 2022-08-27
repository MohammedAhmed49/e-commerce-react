import { useNavigate } from 'react-router-dom'

import './category-item.styles.scss';

const CategoryItem = ({category}) => {

    const navigate = useNavigate();

    const navigateHandler = () => {
        navigate(category.route);
    }

    return (
        <div className="category-container" onClick={navigateHandler}>
            <div className="background-image" style={{
                backgroundImage: `url(${category.imageUrl})`
            }}/>
            <div className="category-body-container">
                <h2>{category.title}</h2>
                <p>Shop Now</p>
            </div>
        </div>
    )
}

export default CategoryItem;