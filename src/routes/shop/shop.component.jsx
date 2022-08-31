import CategoryPreview from "../../components/category-preview/category-preview.component";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/categories.selectors";

import './shop.styles.scss'

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
