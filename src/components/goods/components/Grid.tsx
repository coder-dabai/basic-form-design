import React, { type ReactNode } from 'react';

// 声明console以避免ESLint错误
declare const console: Console;

// Grid组件属性接口
export interface GridProps {
  // 控制列数
  columns?: number;

  // 子元素
  children: ReactNode;

  // 间距（单位：像素）
  gap?: number;

  // 对齐方式
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch';

  // 显示模式
  displayMode?: 'grid' | 'flex';

  // 响应式列配置
  responsiveColumns?: {
    sm?: number; // 小屏幕
    md?: number; // 中屏幕
    lg?: number; // 大屏幕
    xl?: number; // 超大屏幕
  };

  // 基础属性
  className?: string;
  style?: React.CSSProperties;
}

// 扩展Grid组件的类型，添加Item静态属性
export interface GridComponent extends React.FC<GridProps> {
  Item: React.FC<{
    children: ReactNode;
    span?: number;
    className?: string;
    style?: React.CSSProperties;
  }>;
}

/**
 * 栅格容器组件
 * 支持通过属性控制列数，实现灵活的网格布局
 */
const Grid: GridComponent = ({
  columns = 1,
  children,
  gap = 16,
  alignItems = 'stretch',
  displayMode = 'grid',
  responsiveColumns,
  className = '',
  style = {},
}) => {
  // 计算网格样式
  const gridStyle: React.CSSProperties = {
    display: displayMode,
    gap: `${gap}px`,
    alignItems,
    ...style,
  };

  // 设置列数
  if (displayMode === 'grid') {
    gridStyle.gridTemplateColumns = `repeat(${columns}, 1fr)`;

    // 添加响应式样式
    if (responsiveColumns) {
      // 由于React.CSSProperties不支持媒体查询作为属性键，我们需要通过其他方式处理响应式样式
      // 这里我们只设置基础样式，响应式样式应该通过CSS类或CSS-in-JS解决方案来处理
      // 在实际应用中，你可以使用styled-components、emotion或CSS变量等方式
      console.warn(
        'Responsive styles are not fully supported in this implementation. Consider using a CSS-in-JS solution.',
      );
    }
  } else if (displayMode === 'flex') {
    gridStyle.flexWrap = 'wrap';

    // 对于flex模式，我们需要通过子元素的样式来控制列数
    // 这部分可以在子元素中处理，或者返回一个包裹了子元素的新元素
  }

  return (
    <div className={`grid-container ${className}`} style={gridStyle}>
      {children}
    </div>
  );
};

// 创建一个Grid.Item组件用于flex模式下的精确控制
const GridItem: React.FC<{
  children: ReactNode;
  span?: number;
  className?: string;
  style?: React.CSSProperties;
}> = ({ children, span = 1, className = '', style = {} }) => {
  // 计算flex-basis（假设基于12列栅格系统）
  const flexBasis = `${(span / 12) * 100}%`;

  return (
    <div
      className={`grid-item ${className}`}
      style={{
        flexBasis,
        maxWidth: flexBasis,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// 将GridItem作为Grid的静态属性导出
Grid.Item = GridItem;

export default Grid;
