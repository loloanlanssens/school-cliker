import React from 'react';
import { GraduationCap, Github } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-indigo-900 to-blue-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <GraduationCap className="h-8 w-8 mr-2" />
          <h1 className="text-2xl font-bold">Clicker Étudiant</h1>
        </div>
        
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center text-white/80 hover:text-white transition-colors"
        >
          <Github className="h-5 w-5 mr-1" />
          <span className="hidden sm:inline">Voir sur GitHub</span>
        </a>
      </div>
    </header>
  );
};

export default Header;