import CategoryPreview from "../../components/category-preview/category-preview.component";
import { useSelector } from "react-redux";
import { selectCategoriesMap, selectIsLoading } from "../../store/categories/categories.selectors";

import './shop.styles.scss'
import Spinner from "../../components/spinner/spinner.component";

const Shop = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectIsLoading);

  let content = <Spinner />;

  if (!isLoading) {
    content = <>
      {
        Object.keys(categoriesMap).map(title => (
          <CategoryPreview key={title} title={title} products={categoriesMap[title]} />
        ))
      }
      
    </>
  }

  return (
    <>
      { content }
    </>
  );
};

export default Shop;
