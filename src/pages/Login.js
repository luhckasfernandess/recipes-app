import React from 'react';
import rockGlass from '../images/rockGlass.svg';

export default function Login() {
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
          data-testid="email-input"
        />
        <input
          type="password"
          data-testid="password-input"
        />
        <button
          type="button"
          data-testid="login-submit-btn"
          onClick={ () => console.log('cliquei') }
        >
          Enter
        </button>
      </form>
    </div>
  );
}
