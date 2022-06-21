import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RecipesProvider from './context/RecipesProvider';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Profile from './pages/Profile';
import Explore from './pages/Explore';

function App() {
  return (
    <RecipesProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route extact path="/foods" component={ Foods } />
        {/* <Route extact path="/foods/{id-da-receita}" />
        <Route extact path="/foods/{id-da-receita}/in-progress" />
        <Route extact path="/drinks" />
        <Route extact path="/drinks/{id-da-receita}" />
        <Route extact path="/drinks/{id-da-receita}/in-progress" /> */}
        <Route extact path="/explore" component={ Explore } />
        {/* <Route extact path="/explore/foods" />
        <Route extact path="/explore/foods/nationalities" />
        <Route extact path="/explore/foods/ingredients" />
        <Route extact path="/explore/drinks" />
        <Route extact path="/explore/drinks/ingredients" /> */}
        <Route extact path="/profile" component={ Profile } />
        {/* <Route extact path="/done-recipes" />
        <Route extact path="/favorite-recipes" /> */}
      </Switch>
    </RecipesProvider>
  );
}

export default App;
