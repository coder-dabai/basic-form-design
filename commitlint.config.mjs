export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', // 修复bug
        'docs', // 文档更新
        'style', // 代码风格调整
        'refactor', // 代码重构
        'perf', // 性能优化
        'test', // 测试相关
        'build', // 构建相关
        'ci', // CI配置相关
        'chore', // 其他
        'revert', // 回滚
      ],
    ],
    'subject-case': [2, 'always', 'lowerCase'],
    'subject-full-stop': [2, 'never', '.'],
  },
};
