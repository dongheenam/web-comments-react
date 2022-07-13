module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/jsx-runtime",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  ignorePatterns: [
    "*.config.js",
    "*rc.js",
    "**/node_modules/*",
    "src/main.tsx",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    indent: ["warn", 2, { SwitchCase: 1 }],
    quotes: ["warn", "double"],
    "quote-props": ["warn", "as-needed"],
    "object-curly-spacing": ["warn", "always"],
    semi: ["warn", "always"],
    "react/react-in-jsx-scope": "off",
  },
};
