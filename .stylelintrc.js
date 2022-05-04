module.exports = {
  extends: ['stylelint-config-recommended-scss', 'stylelint-config-prettier'],
  defaultSeverity: 'error',
  plugins: ['stylelint-scss', 'stylelint-plugin-license-header'],
  rules: {
    'function-calc-no-unspaced-operator': null,
    'max-nesting-depth': 3,
    'no-descending-specificity': null,
    'no-duplicate-selectors': null,
    'no-invalid-position-at-import-rule': null,
    'rule-empty-line-before': [
      'always-multi-line',
      {
        except: ['first-nested'],
        ignore: ['after-comment'],
      },
    ],
    'scss/at-extend-no-missing-placeholder': null,
    'scss/at-import-no-partial-leading-underscore': null,
    'scss/at-import-partial-extension': null,
    'scss/comment-no-empty': null,
    'scss/no-global-function-names': null,
    'scss/operator-no-newline-after': null,
    'scss/operator-no-unspaced': null,
  },
};
