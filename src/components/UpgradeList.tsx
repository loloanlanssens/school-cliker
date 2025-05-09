import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upgrade } from '../types/game';
import UpgradeItem from './UpgradeItem';
import { Lock } from 'lucide-react';
import { calculateUpgradePrice, formatNumber } from '../utils/gameUtils';

interface UpgradeListProps {
  upgrades: Upgrade[];
  points: number;
  onBuyUpgrade: (upgradeId: string) => void;
}

const UpgradeList: React.FC<UpgradeListProps> = ({ upgrades, points, onBuyUpgrade }) => {
  const sortedUpgrades = [...upgrades].sort((a, b) => {
    if (a.quantity > 0 && b.quantity === 0) return -1;
    if (a.quantity === 0 && b.quantity > 0) return 1;
    return a.unlockThreshold - b.unlockThreshold;
  });

  const activeUpgrades = sortedUpgrades.filter(u => u.type === 'active');
  const passiveUpgrades = sortedUpgrades.filter(u => u.type === 'passive');

  const renderUpgradeList = (upgrades: Upgrade[], type: 'active' | 'passive') => {
    const nextUnlockThreshold = upgrades
      .find(u => u.unlockThreshold > points && u.quantity === 0)
      ?.unlockThreshold;

    return (
      <div className="space-y-3">
        <AnimatePresence>
          {upgrades.map((upgrade, index) => {
            const isUnlocked = points >= upgrade.unlockThreshold || upgrade.quantity > 0;
            const isNextToUnlock = upgrade.unlockThreshold === nextUnlockThreshold;

            if (!isUnlocked && !isNextToUnlock) return null;

            return (
              <motion.div
                key={upgrade.id}
                initial={{ opacity: 0, height: 0, y: 20 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {isUnlocked ? (
                  <UpgradeItem
                    upgrade={upgrade}
                    canAfford={points >= calculateUpgradePrice(upgrade)}
                    onBuy={onBuyUpgrade}
                  />
                ) : (
                  <div className="bg-gray-100 border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Lock className="w-5 h-5 text-gray-400 mr-2" />
                        <div className="text-gray-500">
                          <p className="font-medium">???</p>
                          <p className="text-sm">Débloque à {formatNumber(upgrade.unlockThreshold)} points</p>
                        </div>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full w-24">
                        <div
                          className="h-2 bg-indigo-400 rounded-full transition-all duration-300"
                          style={{ width: `${(points / upgrade.unlockThreshold) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-indigo-50 p-4 rounded-lg shadow"
      >
        <h2 className="text-xl font-bold text-indigo-900 mb-4 flex items-center">
          <span className="mr-2">📚</span> Améliorations d'Études
          <span className="text-sm font-normal ml-2 text-indigo-600">(Augmente la puissance de clic)</span>
        </h2>
        {renderUpgradeList(activeUpgrades, 'active')}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-amber-50 p-4 rounded-lg shadow"
      >
        <h2 className="text-xl font-bold text-amber-900 mb-4 flex items-center">
          <span className="mr-2">🏫</span> Ressources Académiques
          <span className="text-sm font-normal ml-2 text-amber-600">(Génère des points passifs)</span>
        </h2>
        {renderUpgradeList(passiveUpgrades, 'passive')}
      </motion.div>
    </div>
  );
};

export default UpgradeList;