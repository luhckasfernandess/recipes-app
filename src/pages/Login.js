import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import rockGlass from '../images/rockGlass.svg';
import { MIN_PASSWORD_LENGTH } from '../helpers/constants';

export default function Login() {
  const history = useHistory();
  const [isDisabled, setIsDisabled] = useState(true);
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  const validateEmail = (email) => {
    console.log('val email');
    const validateEmailInputRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isplayerEmailValid = validateEmailInputRegex.test(email);
    console.log(isplayerEmailValid);
    setValidEmail(isplayerEmailValid);
  };

  const validatePassword = (password) => {
    console.log('val pass');
    const isPasswordValid = password.length > MIN_PASSWORD_LENGTH;
    console.log(isPasswordValid);
    setValidPassword(isPasswordValid);
  };

  useEffect(() => {
    if (validEmail && validPassword) {
      console.log('setbtn ON');
      setIsDisabled(false);
    } else {
      console.log('setbtn OFF');
      setIsDisabled(true);
    }
  }, [validEmail, validPassword]);

  const handleChange = ({ target: { id, value } }) => {
    console.log('value', value);
    if (id === 'email') validateEmail(value);
    if (id === 'password') validatePassword(value);
  };

  const handleClick = () => {
    const email = document.getElementById('email').value;
    const user = {
      email,
    };
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    history.push('/foods');
  };

  return (
    <div className="meals">
      <span className="logo">TRYBE</span>
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Glass
      </object>
      <form className="login-form">
        <input
          type="email"
          id="email"
          data-testid="email-input"
          placeholder="Email"
          onChange={ handleChange }
        />
        <input
          type="password"
          id="password"
          data-testid="password-input"
          placeholder="Password"
          onChange={ handleChange }
        />
        <button
          type="button"
          data-testid="login-submit-btn"
          onClick={ () => handleClick() }
          disabled={ isDisabled }
        >
          Enter
        </button>
      </form>
    </div>
  );
}
