module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier", "@vue/typescript"],
  parserOptions: {
    parser: "@typescript-eslint/parser"
  },
  rules: {
    /**
     * ESLint 规则
     *
     * 0: 不检查
     * 1: 警告
     * 2: 错误
     *
     */

    /**
     * 强制规则
     */
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    eqeqeq: 2, // 强制使用全等
    "no-lonely-if": 2, // 不允许多层if
    "no-param-reassign": 0, // 不允许给函数参数重新赋值
    "no-mixed-operators": 2, // 不允许混合使用运算符
    "no-underscore-dangle": 2, // 不允许下划线作为变量名之一

    /**
     * 建议规则
     */
    "consistent-return": 0, // 箭头函数最后不需要最后强制return值
    "no-plusplus": 0, // 不允许使用++符号
    "object-shorthand": ["error", "always", { avoidQuotes: false }], // 对象简写
    "no-unused-expressions": 0, // 允许您在表达式中使用三元运算符
    "no-multi-spaces": ["error", { ignoreEOLComments: true }], // 禁止多空格

    /**
     * 普通规则
     */
    semi: 0, // 不检查使用或不使用句尾分号
    "no-restricted-syntax": 0,
    "guard-for-in": 0, // for-in 不检查 hasOwnProperty
    "prefer-const": 0, // 偏好const常量
    "no-else-return": 0,
    "generator-star-spacing": "off",
    "no-console": ["error", { allow: ["warn", "error"] }], // 禁用no-console规则
    "max-len": 0,
    "linebreak-style": 0 // 强制执行一致的换行样式，windows和mac不一样
  }
};
