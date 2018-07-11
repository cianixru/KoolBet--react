const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

  module.exports = function override(config, env) {
  config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);  // change importing css to less
  config = rewireLess.withLoaderOptions({
    javascriptEnabled: true,
    modifyVars: { 
      "@primary-color": "#f00",
      "@link-color": "#1DA57A"
   },
  })(config, env);
    return config;
  };


  /*  https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less */