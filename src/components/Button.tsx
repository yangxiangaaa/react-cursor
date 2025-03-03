import React, { ButtonHTMLAttributes } from 'react';
import './Button.less';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  type?: 'primary' | 'default' | 'danger';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
  type = 'default',
  size = 'medium',
  children,
  onClick,
  disabled = false,
  style,
  ...rest
}) => {
  return (
    <button
      className={`btn btn-${type} btn-${size}`}
      onClick={onClick}
      disabled={disabled}
      style={style}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
