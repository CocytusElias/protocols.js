import { ProtocolMethod, ProtocolOption } from '../protocols';
import { Retry, Timeout } from '../fault';

export const protocolOption: ProtocolOption = {
  timeout: 3000,
  timeoutErrorMessage: Timeout,

  retry: 10,
  retryInterval: 3000,
  retryErrorMessage: Retry,

  method: ProtocolMethod.GET,

  maxBodyLength: 450,
};
