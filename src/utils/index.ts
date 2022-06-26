import * as chalk from 'chalk';

export enum Environment {
  Node = 1,
  Browser,
  UnKnow,
}

export const exception = {
  error(message: string) {
    throw new Error(`[filmeta-client-protocols.js] Error ${message}`);
  },
};

export const println = {
  info(...messages: any[]) {
    console.log(chalk.bold.green(...messages));
  },

  warn(...messages: any[]) {
    console.log(chalk.bold.yellow(...messages));
  },

  error(...messages: any[]) {
    console.log(chalk.bold.red(...messages));
  },
};

export const format = {
  getHttpUrl(url: string) {
    url = url.replace(/^wss:/, 'https:').replace(/^ws:/, 'http:');

    if (!/^http(s)?:\/\//.test(url)) {
      throw exception.error('Is not a http or https url.');
    }

    return url;
  },

  getWsUrl(url: string) {
    url = url.replace(/^https:/, 'wss:').replace(/^http:/, 'ws:');

    if (!/^ws(s)?:\/\//.test(url)) {
      throw exception.error('Is not a ws or wss url.');
    }

    return url;
  },
};
