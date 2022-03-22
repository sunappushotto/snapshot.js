import {
  JsonRpcBatchProvider,
  StaticJsonRpcProvider
} from '@ethersproject/providers';
import networks from '../networks.json';

const providers = {};

export default function getProvider(network: string) {
  const url: any = networks[network].rpc[0];
  const connectionInfo = typeof url === 'object' ? {
    ...url,
    timeout: 25000,
    ensAddress: '0xCfb86556760d03942EBf1ba88a9870e67D77b627',
  } : {
    url,
    timeout: 25000,
    ensAddress: '0xCfb86556760d03942EBf1ba88a9870e67D77b627',
  };
  if (!providers[network]) providers[network] = new StaticJsonRpcProvider(connectionInfo);
  return providers[network];
}

export function getBatchedProvider(network: string) {
  const url: string = networks[network].rpc[0];
  if (!providers[network]) providers[network] = new JsonRpcBatchProvider({
    url,
    ensAddress: '0xCfb86556760d03942EBf1ba88a9870e67D77b627',
  });
  return providers[network];
}
