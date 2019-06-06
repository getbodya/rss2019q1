module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "airbnb",
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        'arrow-parens': ["error", "as-needed"],
        'max-len': ["error", { "code": 110 }],
        'object-curly-newline': ["error", { "multiline": true }],
        'no-tabs': ["error", { allowIndentationTabs: true }],
        'no-param-reassign': ["error", { "props": false }]
    }
};