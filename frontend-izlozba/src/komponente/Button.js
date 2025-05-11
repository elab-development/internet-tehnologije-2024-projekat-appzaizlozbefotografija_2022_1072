import React from 'react';
import './Button.css';

const Button = ({ text, onClick, type = 'button', variant = 'primary', disabled = false }) => {
  return (
    <button
      className={`custom-button ${variant}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
