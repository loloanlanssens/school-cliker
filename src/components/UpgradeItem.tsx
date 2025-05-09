import React from 'react';
import * as LucideIcons from 'lucide-react';
import { Upgrade } from '../types/game';
import { calculateUpgradePrice, formatNumber } from '../utils/gameUtils';

interface UpgradeItemProps {
  upgrade: Upgrade;
  canAfford: boolean;
  onBuy: (upgradeId: string) => void;
}

type IconName = keyof typeof LucideIcons;

const UpgradeItem: React.FC<UpgradeItemProps> = ({ upgrade, canAfford, onBuy }) => {
  const price = calculateUpgradePrice(upgrade);
  const Icon = LucideIcons[upgrade.icon as IconName] || LucideIcons.HelpCircle;
  
  return (
    <div 
      className={`
        flex items-center p-3 border rounded-lg transition-all
        ${canAfford 
          ? 'bg-white border-indigo-200 hover:bg-indigo-50 cursor-pointer shadow-sm hover:shadow' 
          : 'bg-gray-100 border-gray-300 opacity-75 cursor-not-allowed'
        }
      `}
      onClick={() => canAfford && onBuy(upgrade.id)}
    >
      <div 
        className={`
          flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center mr-3
          ${canAfford ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-200 text-gray-500'}
        `}
      >
        <Icon className="w-6 h-6" />
      </div>
      
      <div className="flex-grow">
        <div className="flex justify-between">
          <h3 className="font-bold text-gray-800">{upgrade.name}</h3>
          <span className="font-mono">x{upgrade.quantity}</span>
        </div>
        
        <p className="text-xs text-gray-600 mb-1">{upgrade.description}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-xs">
            {upgrade.type === 'active' 
              ? `+${formatNumber(upgrade.effect)} per click` 
              : `+${formatNumber(upgrade.effect)} per second`}
          </span>
          <span 
            className={`font-bold ${canAfford ? 'text-green-600' : 'text-red-500'}`}
          >
            {formatNumber(price)} points
          </span>
        </div>
      </div>
    </div>
  );
};

export default UpgradeItem;