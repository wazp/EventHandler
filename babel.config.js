// babel.config.js
module.exports = {
    presets: [
      ['@babel/env', {
        debug: false,
        targets: {
            browsers: ['last 3 versions']
        }
    }]
  ]
};
