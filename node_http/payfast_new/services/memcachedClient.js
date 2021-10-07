const memcached = require('memcached')

class MemcachedClient {
  constructor () {
    this._client = new memcached('192.168.56.101:11211', {
      retries: 10,
      retry: 10000,
      remove: true
    })
  }
  getCache (key, callback ) {
    this._client.get(key, callback)
  }
  setCache (key, body, callback) {
    this._client.set(key, body, 60000, callback)
  }
}

module.exports = MemcachedClient