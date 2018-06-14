module.exports = {
  /*
  ** Headers of the page
  */
  cache: {
    max: 1000,
    maxAge: 900000
  },
  dev: (process.env.NODE_ENV !== 'production'),
  head: {
    title: '南城',
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv': 'cleartype', content: 'on' },
      { 'http-equiv': 'Cache-Control' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' },
      { hid: 'description', name: 'description', content: '博客' },
      { hid: 'keywords', name: 'keywords', content: '前端开发，JavaScript, Node, Vue，nuxt' },
      { name: 'author', content: '876253884@qq.com' }
    ],
    noscript: [
      { innerHTML: 'This website requires JavaScript.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  // plugins
  plugins: [
    { src: '~/plugins/clickOutside.js', ssr: false},
    { src: '~/plugins/markdown.js'},
    { src: '~/plugins/filter.js'}
  ],
  /*
  ** Global CSS
  */
  css: [
    {src: '~assets/css/index.scss', lang: 'scss'},
  ],

  // router
  router: {
    linkActiveClass: 'link-active'
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLINT on save
     */
    // 将重复引用的(第三方/自有)模块添加到vendor.bundle.js
    vendor: [
      'axios',
      'marked',
      'highlight.js'
    ],
    // postcss: [
    //   require('postcss-nested')(),
    //   require('postcss-responsive-type')(),
    //   require('postcss-hexrgba')()
    // ],
    // babel
    babel: {
      "presets": [
        ["env", {
          "modules": false,
          "targets": {
            "node": true,
            "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
          }
        }],
        "stage-2"
      ],
      "plugins": ["transform-vue-jsx", "transform-runtime", "transform-async-to-generator"]
    },
    styleResources: {
      scss: ['code/clientNuxt/assets/css/variable.scss', 'code/clientNuxt/assets/css/mixin.scss'],
      options: {}
    },
  },
  srcDir: 'code/clientNuxt/',
}
