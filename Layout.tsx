
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import NotificationHandler from '../notifications/NotificationHandler';
import { LanguageProvider } from '../../contexts/LanguageContext';


interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen bg-brand-light-gray">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <NotificationHandler />
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Layout;
