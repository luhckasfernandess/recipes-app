import React from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [mealsList, setMealsList] = React.useState([]);

  const contextValue = {
    mealsList,
    setMealsList,
  };

  return (
    <RecipesContext.Provider value={ contextValue }>
      {children}
    </RecipesContext.Provider>
  );
}

export default RecipesProvider;

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
