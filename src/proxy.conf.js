const PROXY_CONFIG = [
  {
    context: ['/api', '/oauth2', '/login'],
    target: 'https://betkick-api.leandroruhl.com',
    secure: false,
    logLevel: 'debug'
  }
]

module.exports = PROXY_CONFIG;
