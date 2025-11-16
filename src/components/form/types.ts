// 表单渲染的核心类型定义

// 表单渲染器整体结构
export interface FormRenderer {
  config: FormConfig;
  list: FormItem[];
}

// 控件类型
export const GoodsType = {
  Input: 'input',
  Select: 'select',
  Checkbox: 'checkbox',
  Radio: 'radio',
  Textarea: 'textarea',
  DatePicker: 'datePicker',
  Switch: 'switch',
  Upload: 'upload',
  // 容器类型
  Grid: 'grid',
  Card: 'card',
  Collapse: 'collapse',
} as const;

export type FormItemType = (typeof GoodsType)[keyof typeof GoodsType];

// 基础表单项属性
export interface BaseFormItem {
  id: string; // 唯一标识
  type: FormItemType;
  label?: string; // 标签
  name: string; // 字段名
  placeholder?: string;
  value?: unknown; // 默认值
  disabled?: boolean;
  hidden?: boolean;
}

// 选择框
export interface SelectFormItem extends BaseFormItem {
  type: typeof GoodsType.Select;
  options: {
    label: string;
    value: unknown;
    disabled?: boolean;
  }[];
  multiple?: boolean;
}

// 网格布局
export interface GridFormItem extends BaseFormItem {
  type: typeof GoodsType.Grid;
  columns?: number; // 列数
  gutter?: number; // 间距
  children: FormItem[]; // 子项
}

// 所有表单项类型的联合类型
export type FormItem = BaseFormItem | SelectFormItem | GridFormItem;

// 表单配置
export interface FormConfig {
  id: string;
  title?: string;
  description?: string;
  items: FormItem[];
  layout?: 'vertical' | 'horizontal' | 'inline';
  labelWidth?: string | number;
  colon?: boolean;
  submitButtonText?: string;
  resetButtonText?: string;
}
