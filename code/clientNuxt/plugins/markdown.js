import marked from 'marked'
import highlight from 'highlight.js/lib/highlight'
const languages = ['cpp', 'xml', 'bash', 'css', 'markdown', 'http', 'java', 'javascript', 'json', 'less', 'nginx', 'php', 'python', 'scss', 'sql']
highlight.registerLanguage('cpp', require('highlight.js/lib/languages/cpp'))
highlight.registerLanguage('xml', require('highlight.js/lib/languages/xml'))
highlight.registerLanguage('bash', require('highlight.js/lib/languages/bash'))
highlight.registerLanguage('css', require('highlight.js/lib/languages/css'))
highlight.registerLanguage('markdown', require('highlight.js/lib/languages/markdown'))
highlight.registerLanguage('http', require('highlight.js/lib/languages/http'))
highlight.registerLanguage('java', require('highlight.js/lib/languages/java'))
highlight.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'))
highlight.registerLanguage('json', require('highlight.js/lib/languages/json'))
highlight.registerLanguage('less', require('highlight.js/lib/languages/less'))
highlight.registerLanguage('nginx', require('highlight.js/lib/languages/nginx'))
highlight.registerLanguage('php', require('highlight.js/lib/languages/php'))
highlight.registerLanguage('python', require('highlight.js/lib/languages/python'))
highlight.registerLanguage('scss', require('highlight.js/lib/languages/scss'))
highlight.registerLanguage('sql', require('highlight.js/lib/languages/sql'))
highlight.configure({
  classPrefix: ''
})

const renderer = new marked.Renderer()
renderer.heading = function (text, level) {
  let id = generateId()
  return `<h${level} id="${id}">${text}</h${level}>`
}
marked.setOptions({
  renderer,
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight(code, lang) {
    if (!~languages.indexOf(lang)) {
      return highlight.highlightAuto(code).value
    }
    return highlight.highlight(lang, code).value
  }
})

// H标签解析
function generateId(len) {
  const chars = `ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz`
  len = len | 8
  let id = ``
  for (let i = 0; i < len; i++) {
    id += chars[Math.floor(Math.random() * chars.length)]
  }
  return id
}
// 段落解析
const paragraphParse = text => {
  const textIsImage = text.includes('<img')
  if (textIsImage) return `<div class="image-package">${text}</div>`
  return `<p>${text}</p>`
}

// 对图片进行弹窗处理, 及懒加载处理
const imageParse = (src, title, alt) => {
  return `<img
            src="${src}?imageMogr2/auto-orient/interlace/1/blur/1x0/quality/75|watermark/2/text/amtjaGFvLmNu/font/5qW35L2T/fontsize/720/fill/I0ZERkRGRA==/dissolve/100/gravity/SouthEast/dx/10/dy/10|imageslim"
            title="${title || alt || 'jkchao.cn'}"
            data-src="${src}"
            class="img-pop"/>
          <div class="img-caption">${title || alt || ''}</div>
          `
}

// 外链
const linkParse = (href, title, text) => {
  return `<a href="${href}"
             target="${href.substr(0, 1) === '#' ? '_self' : '_blank'}" 
             class="${href.substr(0, 1) === '#' ? '' : 'c-link'}">
             ${
                href.substr(0, 1) === '#'
                ? text
                : text.length > 40
                  ? text.slice(0, 40) + '...'
                  : text
              }
          </a>`.replace(/\s+/g, ' ').replace('\n', '')
}

renderer.link = linkParse
renderer.paragraph = paragraphParse
renderer.image = imageParse

export default (content, tags, parseHtml = false) => {
  if (typeof content !== 'string') {
    return ''
  }

  // 生成目录树
  var toc = []

  const headingParse = function (text, level, raw) {
    var anchor = this.options.headerPrefix + raw.toLowerCase().replace(/[^\w]+/g, '-')
    if (level >= 4 || level === 1) return `<h${level} id="${anchor}">${text}</h${level}>\n`
    toc.push({
      anchor: `#header-${toc.length}`,
      level: level,
      text: text
    })
    return `<h${level} id="header-${toc.length - 1}">${text}</h${level}>\n`
  }

  marked.setOptions({ sanitize: !parseHtml })

  renderer.heading = headingParse

  let html = marked(content, { renderer })

  // 返回解析内容
  return { html, toc }
}
