import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import {
  okxWallet,
  trustWallet,
  bitgetWallet,
  walletConnectWallet,
  binanceWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { http, createConfig, WagmiProvider } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@rainbow-me/rainbowkit/styles.css';
import App from './App.tsx';
import './index.css';

const projectId = '3bf26c277abb57e44af9fcc2121db184';

const { wallets } = getDefaultWallets({
  appName: '$CIGAR Protocol',
  projectId,
  chains: [mainnet],
});

const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http()
  },
});

const connectors = connectorsForWallets([
  {
    groupName: 'Popular',
    wallets: [
      okxWallet({ projectId: projectId }),
      bitgetWallet({ projectId: projectId }),
      binanceWallet({ projectId: projectId }),
      trustWallet({ projectId: projectId }),
      walletConnectWallet({ projectId: projectId }),
    ],
  },
  {
    groupName: 'Other',
    wallets: wallets,
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>
);