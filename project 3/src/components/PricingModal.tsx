import React, { useState } from 'react';
import { X, Crown, Check, Zap, Sparkles, Star, Infinity } from 'lucide-react';

interface PricingModalProps {
  onClose: () => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({ onClose }) => {
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: isAnnual ? 0 : 0,
      originalPrice: null,
      description: 'Perfect for getting started',
      gradient: 'from-gray-500 to-gray-600',
      features: [
        '5 AI generations per day',
        '720p resolution',
        '3 basic art styles',
        'Watermark included',
        'Standard processing speed'
      ],
      limitations: [
        'Limited styles',
        'Lower resolution',
        'Watermark'
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      price: isAnnual ? 19 : 29,
      originalPrice: isAnnual ? 29 : null,
      description: 'Most popular for creators',
      gradient: 'from-purple-500 to-cyan-500',
      features: [
        'Unlimited AI generations',
        '8K ultra HD resolution',
        '20+ premium art styles',
        'No watermarks',
        'Priority processing (2x faster)',
        'NFT minting included',
        'Advanced editing tools',
        'Commercial license'
      ],
      popular: true
    },
    {
      id: 'studio',
      name: 'Studio',
      price: isAnnual ? 49 : 79,
      originalPrice: isAnnual ? 79 : null,
      description: 'For professionals & agencies',
      gradient: 'from-yellow-500 to-orange-500',
      features: [
        'Everything in Pro',
        'AI video generation',
        '3D photo revival',
        'Bulk processing (100+ images)',
        'API access',
        'White-label licensing',
        'Priority support',
        'Team collaboration',
        'Custom style training'
      ]
    }
  ];

  const handleUpgrade = (planId: string) => {
    // Handle subscription logic here
    console.log('Upgrading to:', planId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900/95 via-purple-900/95 to-cyan-900/95 backdrop-blur-xl rounded-3xl border border-white/10">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        {/* Header */}
        <div className="text-center pt-12 pb-8 px-6">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Crown className="w-8 h-8 text-yellow-400" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Upgrade to Pro
            </h2>
          </div>
          <p className="text-xl text-white/70 mb-6">
            Unlock unlimited AI creativity and professional features
          </p>

          {/* Annual Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`font-medium ${!isAnnual ? 'text-white' : 'text-white/50'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                isAnnual ? 'bg-gradient-to-r from-purple-500 to-cyan-500' : 'bg-white/20'
              }`}
            >
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                isAnnual ? 'translate-x-8' : 'translate-x-1'
              }`} />
            </button>
            <span className={`font-medium ${isAnnual ? 'text-white' : 'text-white/50'}`}>
              Annual
            </span>
            {isAnnual && (
              <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                Save 35%
              </span>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-6 px-6 pb-12">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-1 transition-all duration-300 hover:scale-105 ${
                plan.popular ? 'bg-gradient-to-r from-purple-500 to-cyan-500' : 'bg-white/10'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-500 to-cyan-500 px-4 py-1 rounded-full">
                    <span className="text-white text-sm font-semibold flex items-center space-x-1">
                      <Star className="w-4 h-4" />
                      <span>Most Popular</span>
                    </span>
                  </div>
                </div>
              )}

              <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 h-full">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-white/60 mb-4">{plan.description}</p>
                  
                  <div className="mb-4">
                    {plan.price === 0 ? (
                      <div className="text-4xl font-bold text-white">Free</div>
                    ) : (
                      <div className="flex items-baseline justify-center space-x-2">
                        <span className="text-4xl font-bold text-white">${plan.price}</span>
                        <span className="text-white/60">/{isAnnual ? 'month' : 'month'}</span>
                      </div>
                    )}
                    {plan.originalPrice && (
                      <div className="text-white/40 line-through text-lg">
                        ${plan.originalPrice}/month
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleUpgrade(plan.id)}
                    className={`w-full py-3 rounded-xl font-semibold transition-all ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white hover:scale-105'
                        : plan.id === 'free'
                          ? 'bg-white/10 text-white hover:bg-white/20'
                          : 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:scale-105'
                    }`}
                  >
                    {plan.id === 'free' ? 'Current Plan' : `Upgrade to ${plan.name}`}
                  </button>
                </div>

                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-white/80 text-sm">{feature}</span>
                    </div>
                  ))}
                  
                  {plan.limitations && (
                    <>
                      <div className="border-t border-white/10 pt-3 mt-4">
                        <p className="text-white/40 text-xs mb-2">Limitations:</p>
                        {plan.limitations.map((limitation, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                            <span className="text-white/50 text-xs">{limitation}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Comparison */}
        <div className="px-6 pb-12">
          <h3 className="text-2xl font-bold text-white text-center mb-8">Feature Comparison</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-4 text-white/60 font-medium">Features</th>
                  <th className="py-4 text-center text-white/60 font-medium">Free</th>
                  <th className="py-4 text-center text-white/60 font-medium">Pro</th>
                  <th className="py-4 text-center text-white/60 font-medium">Studio</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-white/5">
                  <td className="py-3 text-white">Daily generations</td>
                  <td className="py-3 text-center text-white/60">5</td>
                  <td className="py-3 text-center text-green-400"><Infinity className="w-4 h-4 mx-auto" /></td>
                  <td className="py-3 text-center text-green-400"><Infinity className="w-4 h-4 mx-auto" /></td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 text-white">Resolution</td>
                  <td className="py-3 text-center text-white/60">720p</td>
                  <td className="py-3 text-center text-green-400">8K</td>
                  <td className="py-3 text-center text-green-400">8K</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 text-white">Art styles</td>
                  <td className="py-3 text-center text-white/60">3</td>
                  <td className="py-3 text-center text-green-400">20+</td>
                  <td className="py-3 text-center text-green-400">20+</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 text-white">Video generation</td>
                  <td className="py-3 text-center text-red-400"><X className="w-4 h-4 mx-auto" /></td>
                  <td className="py-3 text-center text-red-400"><X className="w-4 h-4 mx-auto" /></td>
                  <td className="py-3 text-center text-green-400"><Check className="w-4 h-4 mx-auto" /></td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 text-white">NFT minting</td>
                  <td className="py-3 text-center text-red-400"><X className="w-4 h-4 mx-auto" /></td>
                  <td className="py-3 text-center text-green-400"><Check className="w-4 h-4 mx-auto" /></td>
                  <td className="py-3 text-center text-green-400"><Check className="w-4 h-4 mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="px-6 pb-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <Sparkles className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">2.3M+</div>
                <div className="text-white/60 text-sm">Happy Users</div>
              </div>
              <div>
                <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">50M+</div>
                <div className="text-white/60 text-sm">Images Generated</div>
              </div>
              <div>
                <Star className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">4.9/5</div>
                <div className="text-white/60 text-sm">App Store Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};