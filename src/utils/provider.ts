import {
  JsonRpcBatchProvider,
  StaticJsonRpcProvider
} from '@ethersproject/providers';
import networks from '../networks.json';

const providers = {};

const timeout = 25000;
const ensAddress = '0xCfb86556760d03942EBf1ba88a9870e67D77b627';
const ensResolver = '0x1Ba19b976feFC1C9c684F2B821E494A380f45A0f';

export default function getProvider(network: string) {
  const url: any = networks[network].rpc[0];
  const connectionInfo = typeof url === 'object' ? {
    ...url,
    timeout,
    ensAddress,
    ensResolver,
  } : {
    url,
    timeout,
    ensAddress,
  };
  if (!providers[network]) providers[network] = new StaticJsonRpcProvider(connectionInfo);
  return providers[network];
}

export function getBatchedProvider(network: string) {
  const url: string = networks[network].rpc[0];
  if (!providers[network]) providers[network] = new JsonRpcBatchProvider({
    url,
    ensAddress,
  });
  return providers[network];
}
