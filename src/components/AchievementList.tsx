import React from 'react';
import * as LucideIcons from 'lucide-react';
import { Achievement } from '../types/game';
import { formatNumber } from '../utils/gameUtils';

interface AchievementListProps {
  achievements: Achievement[];
}

type IconName = keyof typeof LucideIcons;

const AchievementList: React.FC<AchievementListProps> = ({ achievements }) => {
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;
  
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-bold text-gray-800 mb-2">Achievements</h2>
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-amber-500 h-2.5 rounded-full" 
            style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
          ></div>
        </div>
        <p className="text-sm text-right text-gray-600 mt-1">
          {unlockedCount} / {totalCount} unlocked
        </p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {achievements.map((achievement) => {
          const Icon = LucideIcons[achievement.icon as IconName] || LucideIcons.Award;
          
          return (
            <div 
              key={achievement.id}
              className={`
                flex flex-col items-center p-3 rounded-lg border text-center
                ${achievement.unlocked 
                  ? 'bg-amber-50 border-amber-200' 
                  : 'bg-gray-100 border-gray-200 filter grayscale opacity-50'
                }
              `}
              title={achievement.unlocked 
                ? achievement.description 
                : `${achievement.description} (${formatRequirement(achievement)})`
              }
            >
              <Icon 
                className={`w-8 h-8 mb-2 ${achievement.unlocked ? 'text-amber-500' : 'text-gray-400'}`} 
              />
              <span className="text-sm font-medium">{achievement.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

function formatRequirement(achievement: Achievement): string {
  const { type, value } = achievement.requirement;
  
  switch (type) {
    case 'points':
      return `Reach ${formatNumber(value)} points`;
    case 'clicks':
      return `Click ${formatNumber(value)} times`;
    case 'upgrades':
      return `Get ${value} different upgrades`;
    default:
      return '';
  }
}

export default AchievementList;