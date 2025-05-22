import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  RainbowKitProvider,
  getDefaultWallets,
} from '@rainbow-me/rainbowkit';
import { http, createConfig, WagmiProvider } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@rainbow-me/rainbowkit/styles.css';
import App from './App.tsx';
import './index.css';

const projectId = '3bf26c277abb57e44af9fcc2121db184';

const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http()
  }
});

const { wallets } = getDefaultWallets({
  appName: '$CIGAR Protocol',
  projectId,
  chains: [mainnet]
});

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider wallets={wallets}>
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>
);