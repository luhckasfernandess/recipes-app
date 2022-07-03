import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RecipesProvider from './context/RecipesProvider';
import './helpers/style.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import ExpFoodsNat from './pages/ExpFoodsNat';
import ExpIngredients from './pages/ExpIngredients';
import ExploreThis from './pages/ExploreThis';
import DoneRecipes from './pages/DoneRecipes';
import RecipeDetails from './pages/RecipeDetails';
import InProgressRecipe from './pages/InProgressRecipe';

function App() {
  return (
    <RecipesProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/foods/:id" component={ RecipeDetails } />
        <Route exact path="/foods/:id/in-progress" component={ InProgressRecipe } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/drinks/:id" component={ RecipeDetails } />
        <Route exact path="/drinks/:id/in-progress" component={ InProgressRecipe } />
        <Route exact path="/explore" component={ Explore } />
        <Route exact path="/explore/foods" component={ ExploreThis } />
        <Route exact path="/explore/foods/nationalities" component={ ExpFoodsNat } />
        <Route exact path="/explore/foods/ingredients" component={ ExpIngredients } />
        <Route exact path="/explore/drinks" component={ ExploreThis } />
        <Route exact path="/explore/drinks/ingredients" component={ ExpIngredients } />
        <Route exact path="/profile" component={ Profile } />
        <Route
          exact
          path="/done-recipes"
          render={ (props) => <DoneRecipes { ...props } page="done" /> }
        />
        <Route
          exact
          path="/favorite-recipes"
          render={ (props) => <DoneRecipes { ...props } page="fav" /> }
        />
      </Switch>
    </RecipesProvider>
  );
}

export default App;
