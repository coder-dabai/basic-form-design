import { GoodsType } from './types';

// 物料数据
export const goodsList = [
  {
    type: GoodsType.Input,
    name: '输入框',
    isContainer: false,
  },
  {
    type: GoodsType.Select,
    name: '选择框',
    isContainer: false,
  },
  {
    type: GoodsType.Grid,
    name: '网格布局',
    isContainer: true,
  },
];
