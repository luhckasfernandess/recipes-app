import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import { useHistory } from 'react-router-dom';
import getFoodsFromAPI from '../helpers/fetchers';
import { MAX_CATEGORY_LIST_LENGTH } from '../helpers/constants';

export default function CategoryMenu({ source }) {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    console.log('Carregou FOODS');
    const defaultList = async () => {
      console.log(`${source}categories.php`);
      const updatedList = await getFoodsFromAPI(source, 'list.php?c=', 'list');
      const newList = updatedList.slice(0, MAX_CATEGORY_LIST_LENGTH);
      setCategoryList(newList);
    };
    defaultList();
  }, [setCategoryList, source]);

  let list;

  if (categoryList.length > 0) {
    list = categoryList.map((category, index) => (
      <button
        key={ `${index}-${category.strCategory}` }
        type="button"
        data-testid={ `${category.strCategory}-category-filter` }
      >
        { category.strCategory }
      </button>
    ));
  } else list = <p>Loading</p>;

  return (<div>{ list }</div>);
}

CategoryMenu.propTypes = {
  source: PropTypes.string.isRequired,
};
