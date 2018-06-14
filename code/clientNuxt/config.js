const IS_DEV = process.env.NODE_ENV !== 'production'

exports.API_ROOT = IS_DEV ? 'http://localhost:8000/api/' : 'https://120.78.220.145/api/'

exports.STATIC_PATH = 'https://120.78.220.145'
