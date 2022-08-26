import { useContext } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import { CategoriesContext } from "../../context/categories.context";

const Category = () => {
    const {cateName} = useParams();
    const { categoriesMap } = useContext(CategoriesContext);

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