import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto py-4 text-center text-gray-600 text-sm">
      <p>Fait avec 📚 et 💻 | &copy; {new Date().getFullYear()} Clicker Étudiant</p>
    </footer>
  );
};

export default Footer;