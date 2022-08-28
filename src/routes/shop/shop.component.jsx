import { useContext } from "react";
import ProductCard from "../../components/product-card/product-card.component";
// import { CategoriesContext } from "../../context/categories.context";

import './shop.styles.scss'
import CategoryPreview from "../../components/category-preview/category-preview.component";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/categories.selectors";

const Shop = () => {
  
  const categoriesMap = useSelector(selectCategoriesMap);

  return (
    <>
      {
        Object.keys(categoriesMap).map(title => (
          <CategoryPreview key={title} title={title} products={categoriesMap[title]} />
        ))
      }
      
    </>

  );
};

export default Shop;
