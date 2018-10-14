const {
  icons: {
    fail,
  },
  colorStr: {
    red,
    yellow,
  },
  log: {
    bothlog,
  },
} = require('../../../utils');

const {
  url: {
    base: baseUrl,
  },
} = require('../config');

const cache = require('../cache');

/**
 * 生成请求头
 */
module.exports = () => {
  const sessionCache = cache.get('session');

  if (!sessionCache) {
    bothlog(red(`${fail} Need login. Use ${yellow('xleetcode login')}`));
    process.exit(1);
  }

  const {
    LEETCODE_SESSION,
    csrftoken,
  } = sessionCache;

  return {
    'Origin': baseUrl,
    'Referer': baseUrl,
    'Cookie': `LEETCODE_SESSION=${LEETCODE_SESSION};csrftoken=${csrftoken};`,
    'x-csrftoken': `${csrftoken};`,
    'x-requested-with': 'XMLHttpRequest',
  };
};