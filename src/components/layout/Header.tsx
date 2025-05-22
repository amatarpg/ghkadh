import React, { useState, useEffect } from 'react';
import { Rocket, Menu, X, Copy, ExternalLink, LogOut } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect, useBalance } from 'wagmi';
import { formatEther } from 'viem';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { address, connector } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({ address });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

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
      setShowProfileMenu(false);
    } catch (error) {
      console.error('Error during disconnect:', error);
    }
  };

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address);
      // You could add a toast notification here
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
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="button-primary px-3 py-2 flex items-center space-x-2"
                  >
                    <span>{truncateAddress(account.address)}</span>
                  </button>

                  {/* Custom Profile Menu */}
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-72 bg-gray-900/95 backdrop-blur-md border border-cyan-glow/30 rounded-lg shadow-xl z-50">
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-cyan-glow font-orbitron">Wallet Profile</h3>
                          <button
                            onClick={() => setShowProfileMenu(false)}
                            className="text-gray-400 hover:text-cyan-glow"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Address */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between bg-black/50 p-3 rounded-lg">
                            <span className="text-sm text-gray-300">{truncateAddress(account.address)}</span>
                            <button
                              onClick={copyAddress}
                              className="text-cyan-glow hover:text-cyan-glow/80 transition-colors"
                            >
                              <Copy className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        {/* Balance */}
                        <div className="mb-4">
                          <div className="bg-black/50 p-3 rounded-lg">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-300">Balance</span>
                              <span className="text-cyan-glow font-orbitron">
                                {balance ? `${parseFloat(formatEther(balance.value)).toFixed(4)} ETH` : '0 ETH'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-2">
                          <button
                            onClick={() => {
                              window.open(`https://etherscan.io/address/${account.address}`, '_blank');
                            }}
                            className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-300 hover:text-cyan-glow transition-colors"
                          >
                            <span>View on Explorer</span>
                            <ExternalLink className="h-4 w-4" />
                          </button>
                          <button
                            onClick={handleDisconnect}
                            className="w-full flex items-center justify-between px-3 py-2 text-sm text-red-400 hover:text-red-300 transition-colors"
                          >
                            <span>Disconnect</span>
                            <LogOut className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
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
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
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
        className={`fixed inset-0 bg-black/95 z-40 transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <nav className="flex flex-col items-center justify-center h-full space-y-6">
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