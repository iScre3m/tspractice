import log4js, { Configuration } from 'log4js';

const config: Configuration = {
  appenders: {
    file: { type: 'file', filename: './logs/logs.log' },
    console: { type: 'console' },
  },
  categories: {
    error: { appenders: ['file'], level: 'error' },
    default: { appenders: ['file'], level: 'info' },
  },
};

log4js.configure(config);

export default log4js;
