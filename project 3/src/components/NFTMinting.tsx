import React, { useState } from 'react';
import { X, Coins, Zap, Wallet, Check, AlertCircle, ExternalLink } from 'lucide-react';

interface NFTMintingProps {
  image: string;
  onClose: () => void;
}

export const NFTMinting: React.FC<NFTMintingProps> = ({ image, onClose }) => {
  const [step, setStep] = useState<'wallet' | 'details' | 'minting' | 'success'>('wallet');
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [nftTitle, setNftTitle] = useState('AI Masterpiece #1');
  const [nftDescription, setNftDescription] = useState('Created with AIrtify - Transform reality into art');
  const [mintPrice, setMintPrice] = useState(0.1);
  const [isConnecting, setIsConnecting] = useState(false);

  const wallets = [
    {
      name: 'MetaMask',
      logo: '🦊',
      description: 'Most popular Ethereum wallet',
      supported: true
    },
    {
      name: 'Phantom',
      logo: '👻',
      description: 'Best for Solana blockchain',
      supported: true
    },
    {
      name: 'Coinbase Wallet',
      logo: '🏦',
      description: 'Easy for beginners',
      supported: true
    },
    {
      name: 'WalletConnect',
      logo: '🔗',
      description: 'Connect any wallet',
      supported: true
    }
  ];

  const blockchains = [
    {
      name: 'Solana',
      symbol: 'SOL',
      fee: '~$0.01',
      speed: '2 seconds',
      recommended: true
    },
    {
      name: 'Ethereum',
      symbol: 'ETH',
      fee: '~$15',
      speed: '2 minutes',
      recommended: false
    },
    {
      name: 'Polygon',
      symbol: 'MATIC',
      fee: '~$0.10',
      speed: '30 seconds',
      recommended: false
    }
  ];

  const handleWalletConnect = async (walletName: string) => {
    setSelectedWallet(walletName);
    setIsConnecting(true);
    
    // Simulate wallet connection
    setTimeout(() => {
      setIsConnecting(false);
      setStep('details');
    }, 2000);
  };

  const handleMint = async () => {
    setStep('minting');
    
    // Simulate minting process
    setTimeout(() => {
      setStep('success');
    }, 4000);
  };

  const renderWalletSelection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">Connect Your Wallet</h3>
        <p className="text-white/60">Choose a wallet to mint your AI artwork as an NFT</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {wallets.map((wallet) => (
          <button
            key={wallet.name}
            onClick={() => handleWalletConnect(wallet.name)}
            disabled={!wallet.supported || isConnecting}
            className={`p-4 rounded-xl border transition-all ${
              selectedWallet === wallet.name
                ? 'border-cyan-400 bg-cyan-400/10'
                : 'border-white/20 hover:border-white/40 bg-white/5'
            } ${!wallet.supported ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
          >
            <div className="flex items-center space-x-4">
              <div className="text-3xl">{wallet.logo}</div>
              <div className="text-left">
                <h4 className="font-semibold text-white">{wallet.name}</h4>
                <p className="text-white/60 text-sm">{wallet.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {isConnecting && (
        <div className="text-center py-4">
          <div className="inline-flex items-center space-x-2 text-cyan-400">
            <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
            <span>Connecting to {selectedWallet}...</span>
          </div>
        </div>
      )}
    </div>
  );

  const renderNFTDetails = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">NFT Details</h3>
        <p className="text-white/60">Customize your NFT before minting</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <img 
            src={image} 
            alt="NFT Preview" 
            className="w-full rounded-xl border-2 border-cyan-400/30"
          />
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-white font-medium mb-2">Title</label>
            <input
              type="text"
              value={nftTitle}
              onChange={(e) => setNftTitle(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
              placeholder="Enter NFT title"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Description</label>
            <textarea
              value={nftDescription}
              onChange={(e) => setNftDescription(e.target.value)}
              rows={3}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white resize-none"
              placeholder="Describe your artwork"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Blockchain</label>
            <div className="space-y-2">
              {blockchains.map((blockchain) => (
                <label
                  key={blockchain.name}
                  className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                    blockchain.recommended
                      ? 'border-green-400 bg-green-400/10'
                      : 'border-white/20 hover:border-white/40 bg-white/5'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="blockchain"
                      defaultChecked={blockchain.recommended}
                      className="text-cyan-400"
                    />
                    <div>
                      <div className="font-medium text-white flex items-center space-x-2">
                        <span>{blockchain.name}</span>
                        {blockchain.recommended && (
                          <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded text-xs">
                            Recommended
                          </span>
                        )}
                      </div>
                      <div className="text-white/60 text-sm">
                        Fee: {blockchain.fee} • Speed: {blockchain.speed}
                      </div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => setStep('wallet')}
          className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-medium transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleMint}
          className="flex-1 bg-gradient-to-r from-purple-500 to-cyan-500 hover:scale-105 text-white py-3 rounded-xl font-medium transition-all"
        >
          Mint NFT for {mintPrice} SOL
        </button>
      </div>
    </div>
  );

  const renderMinting = () => (
    <div className="text-center space-y-6">
      <div className="w-24 h-24 mx-auto bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center animate-pulse">
        <Coins className="w-12 h-12 text-white animate-spin" />
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-white mb-2">Minting Your NFT</h3>
        <p className="text-white/60">Please wait while we mint your masterpiece on the blockchain</p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
          <span className="text-white/80">Uploading to IPFS</span>
          <Check className="w-5 h-5 text-green-400" />
        </div>
        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
          <span className="text-white/80">Creating smart contract</span>
          <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg opacity-50">
          <span className="text-white/80">Broadcasting transaction</span>
          <div className="w-5 h-5"></div>
        </div>
      </div>

      <div className="bg-blue-500/20 border border-blue-400/30 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
          <div className="text-left">
            <p className="text-blue-400 font-medium">Transaction in Progress</p>
            <p className="text-blue-300/80 text-sm">
              Do not close this window. The minting process typically takes 2-4 minutes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="text-center space-y-6">
      <div className="w-24 h-24 mx-auto bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
        <Check className="w-12 h-12 text-white" />
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-white mb-2">NFT Minted Successfully! 🎉</h3>
        <p className="text-white/60">Your AI artwork is now immortalized on the blockchain</p>
      </div>

      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
        <img 
          src={image} 
          alt="Minted NFT" 
          className="w-32 h-32 mx-auto rounded-lg mb-4 border-2 border-green-400/30"
        />
        <h4 className="font-bold text-white mb-2">{nftTitle}</h4>
        <p className="text-white/60 text-sm mb-4">{nftDescription}</p>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-white/60">Token ID:</span>
            <p className="text-white font-mono">#47382</p>
          </div>
          <div>
            <span className="text-white/60">Blockchain:</span>
            <p className="text-white">Solana</p>
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <button className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2">
          <ExternalLink className="w-5 h-5" />
          <span>View on Explorer</span>
        </button>
        <button className="flex-1 bg-gradient-to-r from-purple-500 to-cyan-500 hover:scale-105 text-white py-3 rounded-xl font-medium transition-all">
          Share NFT
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900/95 via-purple-900/95 to-cyan-900/95 backdrop-blur-xl rounded-3xl border border-white/10 p-8">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        <div className="mb-8">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Coins className="w-8 h-8 text-yellow-400" />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Mint as NFT
            </h2>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[
                { key: 'wallet', label: 'Connect', icon: <Wallet className="w-4 h-4" /> },
                { key: 'details', label: 'Details', icon: <Zap className="w-4 h-4" /> },
                { key: 'minting', label: 'Minting', icon: <Coins className="w-4 h-4" /> },
                { key: 'success', label: 'Success', icon: <Check className="w-4 h-4" /> }
              ].map((stepItem, index) => (
                <div key={stepItem.key} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                    step === stepItem.key 
                      ? 'border-cyan-400 bg-cyan-400/20 text-cyan-400' 
                      : ['wallet', 'details'].includes(stepItem.key) && ['details', 'minting', 'success'].includes(step)
                        ? 'border-green-400 bg-green-400/20 text-green-400'
                        : step === 'minting' && stepItem.key === 'minting'
                          ? 'border-yellow-400 bg-yellow-400/20 text-yellow-400'
                          : step === 'success' && stepItem.key === 'success'
                            ? 'border-green-400 bg-green-400/20 text-green-400'
                            : 'border-white/30 text-white/30'
                  }`}>
                    {stepItem.icon}
                  </div>
                  <span className={`ml-2 text-sm ${
                    step === stepItem.key ? 'text-white' : 'text-white/50'
                  }`}>
                    {stepItem.label}
                  </span>
                  {index < 3 && (
                    <div className={`w-8 h-0.5 mx-4 ${
                      ['details', 'minting', 'success'].includes(step) && index < ['wallet', 'details', 'minting', 'success'].indexOf(step)
                        ? 'bg-green-400'
                        : 'bg-white/20'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {step === 'wallet' && renderWalletSelection()}
        {step === 'details' && renderNFTDetails()}
        {step === 'minting' && renderMinting()}
        {step === 'success' && renderSuccess()}
      </div>
    </div>
  );
};