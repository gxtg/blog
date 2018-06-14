module.exports = {
  admin: {
      dev: {
          env: 'development',
          publicPath: '/',
          host: 'localhost',
          port: '8090',
          assetsSubDirectory: 'static',
          devtoolType: 'cheap-module-eval-source-map',
          proxyTable: {  // proxy代理,代理本机的请求
              '/api': { // 有固定前缀的话可以加到'/'的后面
                  target: 'http://localhost:3000/',
                  changeOrigin: true
                //   pathRewrite: {
                //     '^/': '/' // ^代表前面配置的target,斜杠后面可以加上要重写或去除的路由
                //   }
              }
          }
      },
      build: {
          env: 'production', // 当前环境
          publicPath: '/admin/', // html引用资源路径
          assetsPath: 'static', // 静态资源目录
          assetsSubDirectory: 'static', // html资源存放目录
          devtoolType: 'source-map', // 代码位置信息
          productionGzip: false, //开启Gzip压缩
          productionGzipExtensions: ['js', 'css'] //Gzip压缩文件
      }
  },

  client: {
      dev: {
          env: 'development',
          publicPath: '/',
          host: 'localhost',
          port: '8080',
          assetsSubDirectory: 'static',
          devtoolType: 'cheap-module-eval-source-map',
          proxyTable: {
              '/': {
                  target: 'http://localhost:3000/',
                  changeOrigin: true,
                  pathRewrite: {
                    '^': '/'
                  }
              }
          }
      },
      build: {
          env: 'production',
          publicPath: '/client/',
          assetsPath: 'static',
          assetsSubDirectory: 'static',
          devtoolType: 'source-map',
          productionGzip: false,
          productionGzipExtensions: ['js', 'css'] 
      }
  }
  
}