import React from 'react';

interface InputProps {
  // 数据绑定属性
  value?: string;
  onChange?: (value: string) => void;

  // 控制属性
  disabled?: boolean;
  hidden?: boolean;

  // 基础输入框属性
  placeholder?: string;
  type?: 'text' | 'password' | 'number' | 'email' | 'tel';
  maxLength?: number;
  minLength?: number;

  // 样式和其他属性
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  name?: string;

  // 其他可能需要的属性
  [key: string]: unknown;
}

const Input: React.FC<InputProps> = ({
  value = '',
  onChange,
  disabled = false,
  hidden = false,
  placeholder = '',
  type = 'text',
  maxLength,
  minLength,
  className = '',
  style = {},
  id,
  name,
  ...restProps
}) => {
  // 如果hidden为true，则不渲染组件
  if (hidden) {
    return null;
  }

  // 处理输入变化
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled && onChange) {
      onChange(e.target.value);
    }
  };

  // 构建基础样式类名
  const baseClassName = `px-3 py-2 border rounded w-full focus:outline-none transition-all ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'focus:ring-2 focus:ring-blue-500'}`;
  const combinedClassName = className ? `${baseClassName} ${className}` : baseClassName;

  return (
    <input
      type={type}
      value={value}
      onChange={handleChange}
      disabled={disabled}
      placeholder={placeholder}
      maxLength={maxLength}
      minLength={minLength}
      className={combinedClassName}
      style={style}
      id={id}
      name={name}
      {...restProps}
    />
  );
};

export default Input;
