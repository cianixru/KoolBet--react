const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

  module.exports = function override(config, env) {
  config = injectBabelPlugin(['import', { libraryName: 'antd',
   style: "true"
  }], config);
  config = rewireLess.withLoaderOptions({
    javascriptEnabled: true,
    modifyVars: { 
      "@font-family": "'Roboto Condensed', Arial, sans-serif",
   },
  })(config, env);
    return config;
  };


  /*  https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less */