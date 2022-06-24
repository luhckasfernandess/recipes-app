import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RecipesProvider from './context/RecipesProvider';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import ExploreFoods from './pages/ExploreFoods';
import ExpFoodsNat from './pages/ExpFoodsNat';
import ExpFoodsIng from './pages/ExpFoodsIng';
import ExploreDrinks from './pages/ExploreDrinks';
import ExpDrinksIng from './pages/ExpDrinksIng';
import DoneRecipes from './pages/DoneRecipes';
import Favorites from './pages/Favorites';
import RecipeDetails from './pages/RecipeDetails';

function App() {
  return (
    <RecipesProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Foods } />
        <Route extact path="/foods/:id" component={ RecipeDetails } />
        {/* <Route extact path="/foods/{id-da-receita}/in-progress" /> */}
        <Route exact path="/drinks" component={ Drinks } />
        <Route extact path="/drinks/:id" component={ RecipeDetails } />
        {/* <Route extact path="/drinks/{id-da-receita}/in-progress" /> */}
        <Route exact path="/explore" component={ Explore } />
        <Route exact path="/explore/foods" component={ ExploreFoods } />
        <Route exact path="/explore/foods/nationalities" component={ ExpFoodsNat } />
        <Route exact path="/explore/foods/ingredients" component={ ExpFoodsIng } />
        <Route exact path="/explore/drinks" component={ ExploreDrinks } />
        <Route exact path="/explore/drinks/ingredients" component={ ExpDrinksIng } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ Favorites } />
      </Switch>
    </RecipesProvider>
  );
}

export default App;
