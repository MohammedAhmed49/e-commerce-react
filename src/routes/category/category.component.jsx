import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import { selectCategoriesMap } from "../../store/categories/categories.selectors";

const Category = () => {
    const {cateName} = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    
    return (
        <div>
            <h2>{cateName.toUpperCase()}</h2>
            <div className="products-container">
                {categoriesMap[cateName]?.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}

export default Category;