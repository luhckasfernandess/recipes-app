import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import getFoodsFromAPI from '../helpers/fetchers';
import { MAX_CATEGORY_LIST_LENGTH, MAX_LIST_LENGTH } from '../helpers/constants';

export default function CategoryMenu({ source }) {
  const [categoryList, setCategoryList] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const { setMealsList } = useContext(RecipesContext);

  useEffect(() => {
    const defaultList = async () => {
      const updatedList = await getFoodsFromAPI(source, 'list.php?c=', 'list');
      console.log(updatedList);
      const newList = updatedList.slice(0, MAX_CATEGORY_LIST_LENGTH);
      setCategoryList(newList);
    };
    defaultList();
  }, [setCategoryList, source]);

  const filterByCategory = async (category) => {
    if (activeFilter === category || category === 'All') {
      const updatedList = await getFoodsFromAPI(source, 'search.php?s=', '');
      setMealsList(updatedList);
      setActiveFilter('All');
    } else {
      const updatedList = await getFoodsFromAPI(source, 'filter.php?c=', category);
      const newList = updatedList.slice(0, MAX_LIST_LENGTH);
      setMealsList(newList);
      setActiveFilter(category);
    }
  };

  let list;

  if (categoryList.length > 0) {
    list = categoryList.map((category, index) => (
      <button
        key={ `${index}-${category.strCategory}` }
        type="button"
        data-testid={ `${category.strCategory}-category-filter` }
        onClick={ () => filterByCategory(category.strCategory) }
      >
        { category.strCategory }
      </button>
    ));
  } else list = <p>Loading</p>;

  return (
    <div>
      { list }
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => filterByCategory('All') }
      >
        All
      </button>
    </div>
  );
}

CategoryMenu.propTypes = {
  source: PropTypes.string.isRequired,
};
