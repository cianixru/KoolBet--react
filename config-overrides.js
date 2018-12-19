const { injectBabelPlugin } = require('react-app-rewired');

const rewireSass = require('react-app-rewire-scss');

/* config-overrides.js */
module.exports = function override(config, env) {
  
  config = injectBabelPlugin(['import', {
    libraryName: 'antd',
    style: "true"
  }], config);
  
 /*  config = injectBabelPlugin(['react-intl', {
      "messagesDir": "./src/translations/extractedMessages"
  }], config); */
  
  config.resolve = {
    modules: ['src' , 'node_modules'],
    extensions: ['.js', '.jsx'],
  };
    
  config.entry.push("babel-polyfill");

  config = rewireSass(config, env);

  config.module.rules.push({
      test: /\.(html)$/,
      use: {
          loader: 'html-loader',
          options: {
              attrs: [':data-src']
          }
      }
  });
  
  return config;
};