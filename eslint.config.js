import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// 解决 ESM 模块中 __dirname 问题
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default [
  // 1. 基础配置：适用于所有文件
  {
    ignores: ['node_modules/', 'dist/', '*.config.js', '*.d.ts', '.vscode/', 'coverage/'], // 忽略文件
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        browser: true,
        node: true,
        es2021: true,
        document: true,
        window: true,
      },
    },
    plugins: {
      prettier, // 注册 Prettier 插件
    },
    rules: {
      // 通用规则（覆盖默认 JS 规则）
      ...js.configs.recommended.rules,
      'no-console': ['warn', { allow: ['warn', 'error'] }], // 禁止 console.log
      'no-debugger': 'error', // 禁止 debugger
      eqeqeq: ['error', 'always'], // 强制 ===
      'prettier/prettier': 'error', // 将 Prettier 格式问题视为 ESLint 错误
      linebreakStyle: 'off',
    },
  },

  // 2. TypeScript 配置：仅对 .ts/.tsx 文件生效
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser, // TypeScript 解析器
      parserOptions: {
        projectService: true, // 使用 projectService 支持项目引用
        tsconfigRootDir: __dirname,
        ecmaFeatures: {
          jsx: true, // 支持 JSX
        },
      },
    },
    plugins: {
      '@typescript-eslint': tseslint, // 注册 TS 插件
    },
    rules: {
      // TypeScript 规则
      ...tseslint.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'error', // 禁止 any 类型
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' }, // 允许 _ 开头的参数未使用
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'off', // 允许返回值类型推断
    },
  },

  // 3. React 配置：仅对 .tsx 文件生效
  {
    files: ['**/*.tsx'],
    plugins: {
      react,
      'react-hooks': reactHooks,
    },
    settings: {
      react: {
        version: 'detect', // 自动检测 React 版本（适配 React 19）
      },
    },
    rules: {
      // React 规则
      ...react.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off', // React 17+ 无需引入 React
      'react/prop-types': 'off', // 用 TypeScript 类型替代 prop-types
      'react/function-component-definition': [
        'error',
        { namedComponents: 'arrow-function' }, // 组件强制用箭头函数
      ],
      'react/jsx-filename-extension': [
        'error',
        { extensions: ['.tsx'] }, // 仅允许 .tsx 写 JSX
      ],

      // React Hooks 规则
      ...reactHooks.configs.recommended.rules,
      'react-hooks/exhaustive-deps': 'warn', // 检查依赖项（警告级别）
    },
  },
];
