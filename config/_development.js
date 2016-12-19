// We use an explicit public path when the assets are served by webpack
// to fix this issue:
// http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
export default (config) => ({
  compiler_public_path: `http://${config.server_host}:${config.server_port}/`,
  proxy: {
    enabled: true,
    options: {
      // koa-proxy options
      // host: 'http://10.15.190.150:3002/',
      host: 'http://10.213.57.216:8083/',
      match: /v1/
    }
  }
})
