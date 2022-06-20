import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      {/* <Route extact path="/foods" />
      <Route extact path="/foods/{id-da-receita}" />
      <Route extact path="/foods/{id-da-receita}/in-progress" />
      <Route extact path="/drinks" />
      <Route extact path="/drinks/{id-da-receita}" />
      <Route extact path="/drinks/{id-da-receita}/in-progress" />
      <Route extact path="/explore" />
      <Route extact path="/explore/foods" />
      <Route extact path="/explore/foods/nationalities" />
      <Route extact path="/explore/foods/ingredients" />
      <Route extact path="/explore/drinks" />
      <Route extact path="/explore/drinks/ingredients" />
      <Route extact path="/profile" />
      <Route extact path="/done-recipes" />
      <Route extact path="/favorite-recipes" /> */}
    </Switch>
  );
}

export default App;
