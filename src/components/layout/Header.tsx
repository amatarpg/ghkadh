import React, { useState, useEffect } from 'react';
import { Rocket, Menu, X } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect } from 'wagmi';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { disconnect } = useDisconnect();
  const { connector } = useAccount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleDisconnect = async () => {
    try {
      if (connector?.id === 'metaMask' && window.ethereum) {
        await window.ethereum.request({
          method: 'wallet_revokePermissions',
          params: [{ eth_accounts: {} }],
        });
      }
      disconnect();
    } catch (error) {
      console.error('Error during disconnect:', error);
    }
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const CustomConnectButton = () => (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button onClick={openConnectModal} className="button-primary">
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} className="button-primary text-red-500">
                    Wrong network
                  </button>
                );
              }

              return (
                <button
                  onClick={openAccountModal}
                  className="button-primary px-3 py-2"
                >
                  {truncateAddress(account.address)}
                </button>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Rocket className="h-8 w-8 text-cyan-glow mr-2" />
            <span className="font-orbitron text-xl font-bold text-white">
              <span className="text-cyan-glow">$</span>CIGAR
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {['Mission', 'Story', 'Technology', 'Community', 'Join'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`} 
                className="font-exo text-gray-300 hover:text-cyan-glow transition-colors relative group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-glow group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </nav>

          {/* Connect Wallet Button */}
          <div className="hidden md:block">
            <CustomConnectButton />
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white" 
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-cyan-glow" />
            ) : (
              <Menu className="h-6 w-6 text-cyan-glow" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-black/95 z-40 flex flex-col items-center justify-center transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <nav className="flex flex-col items-center space-y-6">
          {['Mission', 'Story', 'Technology', 'Community', 'Join'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`} 
              className="font-exo text-xl text-gray-300 hover:text-cyan-glow transition-colors"
              onClick={toggleMobileMenu}
            >
              {item}
            </a>
          ))}
          <div className="mt-6">
            <CustomConnectButton />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;