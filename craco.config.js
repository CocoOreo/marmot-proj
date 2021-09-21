const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#79B4B7',
            '@font-size-base': '16px',
         },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};