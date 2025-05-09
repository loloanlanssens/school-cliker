import React, { useState } from 'react';
import { useGameState } from './hooks/useGameState';
import { Toaster } from 'sonner';
import Header from './components/Header';
import ClickArea from './components/ClickArea';
import UpgradeList from './components/UpgradeList';
import AchievementList from './components/AchievementList';
import Footer from './components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/Tabs';

function App() {
  const { gameState, handleClick, buyUpgrade, resetGame, availableUpgrades } = useGameState();
  const [activeTab, setActiveTab] = useState<string>('upgrades');

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 to-amber-50">
      <Toaster position="top-right" expand={true} richColors />
      <Header />
      
      <main className="container mx-auto px-4 py-6 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-12 mb-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
              <ClickArea
                points={gameState.points}
                pointsPerClick={gameState.pointsPerClick}
                pointsPerSecond={gameState.pointsPerSecond}
                onClick={handleClick}
              />
            </div>
          </div>
          
          <div className="lg:hidden col-span-1">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full">
                <TabsTrigger value="upgrades" className="flex-1">Améliorations</TabsTrigger>
                <TabsTrigger value="achievements" className="flex-1">Succès</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upgrades" className="mt-4">
                <UpgradeList
                  upgrades={availableUpgrades}
                  points={gameState.points}
                  onBuyUpgrade={buyUpgrade}
                />
              </TabsContent>
              
              <TabsContent value="achievements" className="mt-4">
                <AchievementList achievements={gameState.achievements} />
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="hidden lg:block lg:col-span-8">
            <UpgradeList
              upgrades={availableUpgrades}
              points={gameState.points}
              onBuyUpgrade={buyUpgrade}
            />
          </div>
          
          <div className="hidden lg:block lg:col-span-4">
            <AchievementList achievements={gameState.achievements} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;