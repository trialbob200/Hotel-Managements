
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { APP_NAME, LANGUAGES } from '../../constants.tsx'; // Updated import path
import Button from '../ui/Button';
import { useLanguage } from '../../contexts/LanguageContext'; // Assuming this context exists

// Placeholder icons, replace with actual icons
const UserCircleIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const LogoutIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
  </svg>
);
const MenuIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);
const GlobeAltIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A11.978 11.978 0 0112 16.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 003 12c0-.778.099-1.533.284-2.253m0 0A11.978 11.978 0 0012 7.5c2.998 0 5.74 1.1 7.843 2.918" />
  </svg>
);


const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { language, setLanguage, getText } = useLanguage(); // Using LanguageContext

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  const navLinks = [
    { to: '/', label: getText('navHome', 'Home') },
    { to: '/rooms', label: getText('navRooms', 'Rooms') },
    // Add more common links
  ];
  
  const NavLinkItem: React.FC<{ to: string, label: string, onClick?: () => void }> = ({ to, label, onClick }) => (
    <Link 
        to={to} 
        className="text-brand-white hover:text-brand-gold transition-colors duration-200 px-3 py-2 rounded-md text-sm font-medium"
        onClick={onClick}
    >
        {label}
    </Link>
  );


  return (
    <nav className="bg-brand-midnight-blue shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and primary navigation */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-3xl font-bold text-brand-gold">{APP_NAME}</span>
            </Link>
            <div className="hidden md:ml-10 md:flex md:items-baseline md:space-x-4">
              {navLinks.map(link => <NavLinkItem key={link.to} to={link.to} label={link.label} />)}
              {user && user.role === 'guest' && <NavLinkItem to="/dashboard" label={getText('navDashboard', 'My Dashboard')} />}
              {user && user.role === 'admin' && <NavLinkItem to="/admin" label={getText('navAdminPanel', 'Admin Panel')} />}
            </div>
          </div>

          {/* Right side: Language, User/Login */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
                <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as 'en' | 'hi')}
                    className="bg-brand-midnight-blue-light text-brand-white border border-brand-teal rounded-md py-1.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
                >
                    {LANGUAGES.map(lang => (
                    <option key={lang.code} value={lang.code}>{lang.name}</option>
                    ))}
                </select>
            </div>

            {user ? (
              <div className="relative">
                <Button
                  variant="ghost"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="text-brand-white hover:text-brand-gold"
                  aria-label="User menu"
                >
                  <UserCircleIcon className="w-7 h-7" />
                  <span className="ml-2 hidden lg:inline">{user.name}</span>
                </Button>
                {isUserMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-brand-white ring-1 ring-brand-midnight-blue ring-opacity-5 focus:outline-none">
                    <Link
                      to={user.role === 'guest' ? "/dashboard" : "/admin"}
                      className="block px-4 py-2 text-sm text-brand-dark-gray hover:bg-brand-light-gray"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      {user.role === 'guest' ? getText('navDashboard', 'My Dashboard') : getText('navAdminPanel', 'Admin Panel')}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogoutIcon className="mr-2" />
                      {getText('navLogout', 'Logout')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Button onClick={() => navigate('/login')} variant="secondary" size="sm">
                {getText('navLogin', 'Login / Sign Up')}
              </Button>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-brand-gold hover:text-brand-white hover:bg-brand-midnight-blue-light focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-gold"
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
            >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? <LogoutIcon className="block h-6 w-6" /> : <MenuIcon className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      {isMobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map(link => <NavLinkItem key={`mobile-${link.to}`} to={link.to} label={link.label} onClick={() => setIsMobileMenuOpen(false)} />)}
            {user && user.role === 'guest' && <NavLinkItem to="/dashboard" label={getText('navDashboard', 'My Dashboard')} onClick={() => setIsMobileMenuOpen(false)} />}
            {user && user.role === 'admin' && <NavLinkItem to="/admin" label={getText('navAdminPanel', 'Admin Panel')} onClick={() => setIsMobileMenuOpen(false)} />}
          </div>
          <div className="pt-4 pb-3 border-t border-brand-teal">
            {user ? (
              <div className="flex items-center px-5">
                <UserCircleIcon className="w-10 h-10 text-brand-gold" />
                <div className="ml-3">
                  <div className="text-base font-medium text-brand-white">{user.name}</div>
                  <div className="text-sm font-medium text-brand-gray">{user.email}</div>
                </div>
              </div>
            ) : null}
            <div className="mt-3 px-2 space-y-1">
                {/* Language Selector for mobile */}
                <div className="px-3 py-2">
                    <select
                        value={language}
                        onChange={(e) => { setLanguage(e.target.value as 'en' | 'hi'); setIsMobileMenuOpen(false); }}
                        className="w-full bg-brand-midnight-blue-light text-brand-white border border-brand-teal rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
                    >
                        {LANGUAGES.map(lang => (
                        <option key={lang.code} value={lang.code}>{lang.name}</option>
                        ))}
                    </select>
                </div>

              {user ? (
                <button
                  onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-400 hover:text-red-200 hover:bg-brand-midnight-blue-light"
                >
                  <LogoutIcon className="inline mr-2" /> {getText('navLogout', 'Logout')}
                </button>
              ) : (
                <Button onClick={() => {navigate('/login'); setIsMobileMenuOpen(false);}} variant="secondary" size="sm" className="w-full">
                  {getText('navLogin', 'Login / Sign Up')}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
