module.exports = {
  "env": {
      "browser": true,
      "es6": true,
      "node": true,
      "commonjs": true
  },
  "parser": "babel-eslint",
  "plugins": [
      "react"
  ],
  "rules": {
    "indent": ["error", 2],
    "quotes": ["error", "double"],
    "semi": ["error", "never"],
    "no-console": "error",
    "arrow-parens": 0
  }
}