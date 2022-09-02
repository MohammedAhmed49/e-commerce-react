import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import Spinner from "../../components/spinner/spinner.component";
import { selectCategoriesMap, selectIsLoading } from "../../store/categories/categories.selectors";

const Category = () => {
    const {cateName} = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);

    const isLoading = useSelector(selectIsLoading);

    let content = <Spinner />;

    console.log(isLoading);

    if (!isLoading) {
        content = <>
            <div className="products-container">
                {categoriesMap[cateName]?.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </>
    }
    
    return (
        <div>
            <h2>{cateName.toUpperCase()}</h2>
            {content}
        </div>
    )
}

export default Category;