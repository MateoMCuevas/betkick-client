const targetUrl = process.env.TARGET_URL || 'http://localhost:8080';

const PROXY_CONFIG = [
  {
    context: ['/api', '/oauth2', '/login'],
    target: targetUrl,
    secure: true,
    logLevel: 'debug'
  }
]

module.exports = PROXY_CONFIG;
