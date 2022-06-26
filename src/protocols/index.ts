import { exception } from '../utils';
import { HttpClient } from './http';
import { WsClient } from './ws';
import { Interceptor } from '../plugin/Interceptor';
import { ProtocolTypeErr } from '../fault';
import { protocolOption } from '../defaults/protocol-option';

export enum ProtocolType {
  HTTP = 'http',
  WebSocket = 'websocket',
}

export enum ProtocolMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

export type Headers = Record<string, string | number | boolean>;

export type ResponseEncoding =
  | 'ascii'
  | 'ASCII'
  | 'ansi'
  | 'ANSI'
  | 'binary'
  | 'BINARY'
  | 'base64'
  | 'BASE64'
  | 'base64url'
  | 'BASE64URL'
  | 'hex'
  | 'HEX'
  | 'latin1'
  | 'LATIN1'
  | 'ucs-2'
  | 'UCS-2'
  | 'ucs2'
  | 'UCS2'
  | 'utf-8'
  | 'UTF-8'
  | 'utf8'
  | 'UTF8'
  | 'utf16le'
  | 'UTF16LE';

export interface ProtocolOption {
  timeout?: number; // 超时时间
  timeoutErrorMessage?: string; // 超时异常信息

  retry?: number; // 超时重连最大次数：-1 不进行超时重连、0 持续超时重连、大于 0 为最大超时重连次数
  retryInterval?: number; // 超时重连之间时间间隔，单位为 ms
  retryErrorMessage?: string; // 超时重连失败异常信息

  header?: Headers; // 请求头
  query?: any; // url 后缀
  body?: any; // 请求体
  url?: string; // 请求地址
  baseUrl?: string | string[]; // 基础地址
  method?: ProtocolMethod; // 请求方法

  maxBodyLength?: number;

  // TODO: AUTH
}

export type Response<T = any> = {
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
  request: ProtocolOption;
  responseEncoding?: ResponseEncoding | string;
};

export class Protocol {
  public readonly protocolType: ProtocolType;
  public readonly options: ProtocolOption;
  private readonly client: HttpClient | WsClient;
  public readonly interceptor: {
    request: Interceptor<ProtocolOption>;
    response: Interceptor<Response>;
  };

  constructor(protocolType: ProtocolType, options?: ProtocolOption) {
    this.protocolType = protocolType;
    this.interceptor = {
      request: new Interceptor<ProtocolOption>(),
      response: new Interceptor<Response>(),
    };

    // TODO: merge
    if (options) {
      this.options = options;
    } else {
      this.options = protocolOption;
    }

    switch (protocolType) {
      case ProtocolType.HTTP:
        this.client = new HttpClient(this.options);
        break;
      case ProtocolType.WebSocket:
        this.client = new WsClient(this.options);
        break;
      default:
        throw exception.error(ProtocolTypeErr);
    }
  }

  // TODO: 请求发送，发送前走拦截器，响应后走拦截器

  // TODO: 请求取消

  // TODO: 并发请求

  // TODO: 连接关闭

  // TODO: 连接重启

  // TODO: 连接复制
}
