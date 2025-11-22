import React from 'react';

// 定义选项的类型
interface Option {
  value: string | number;
  label: string;
}

interface SelectProps {
  // 数据绑定属性
  value?: string | number;
  onChange?: (value: string | number) => void;

  // 选项数据
  options: Option[];

  // 控制属性
  disabled?: boolean;
  hidden?: boolean;

  // 基础属性
  placeholder?: string;

  // 样式和其他属性
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  name?: string;

  // 其他可能需要的属性
  [key: string]: unknown;
}

const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options = [],
  disabled = false,
  hidden = false,
  placeholder = '请选择',
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

  // 处理选择变化
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!disabled && onChange) {
      // 根据选项值的类型进行转换
      const newValue =
        options.find((opt) => opt.value.toString() === e.target.value)?.value || e.target.value;
      onChange(newValue);
    }
  };

  // 构建基础样式类名
  const baseClassName = `px-3 py-2 border rounded w-full focus:outline-none transition-all appearance-none ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'focus:ring-2 focus:ring-blue-500'}`;
  const combinedClassName = className ? `${baseClassName} ${className}` : baseClassName;

  return (
    <select
      value={value ?? ''}
      onChange={handleChange}
      disabled={disabled}
      className={combinedClassName}
      style={style}
      id={id}
      name={name}
      {...restProps}
    >
      {!value && (
        <option value="" disabled hidden>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
