import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RecipesProvider from './context/RecipesProvider';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import ExploreFoods from './pages/ExploreFoods';
import ExpFoodsNat from './pages/ExpFoodsNat';
import ExpFoodsIng from './pages/ExpFoodsIng';
import ExploreDrinks from './pages/ExploreDrinks';
import ExpDrinksIng from './pages/ExpDrinksIng';
import DoneRecipes from './pages/DoneRecipes';
import Favourites from './pages/Favourites';

function App() {
  return (
    <RecipesProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route extact path="/foods" component={ Foods } />
        {/* <Route extact path="/foods/{id-da-receita}" />
        <Route extact path="/foods/{id-da-receita}/in-progress" /> */}
        <Route extact path="/drinks" />
        {/* <Route extact path="/drinks/{id-da-receita}" />
        <Route extact path="/drinks/{id-da-receita}/in-progress" /> */}
        <Route extact path="/explore" component={ Explore } />
        <Route extact path="/explore/foods" component={ ExploreFoods } />
        <Route extact path="/explore/foods/nationalities" component={ ExpFoodsNat } />
        <Route extact path="/explore/foods/ingredients" component={ ExpFoodsIng } />
        <Route extact path="/explore/drinks" component={ ExploreDrinks } />
        <Route extact path="/explore/drinks/ingredients" component={ ExpDrinksIng } />
        <Route extact path="/profile" component={ Profile } />
        <Route extact path="/done-recipes" component={ DoneRecipes } />
        <Route extact path="/favorite-recipes" component={ Favourites } />
      </Switch>
    </RecipesProvider>
  );
}

export default App;
