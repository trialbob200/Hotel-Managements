
import React from 'react';
import { Link } from 'react-router-dom';
import { APP_NAME } from '../../constants.tsx'; // Updated import path
import { useLanguage } from '../../contexts/LanguageContext';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { getText } = useLanguage();

  return (
    <footer className="bg-brand-midnight-blue text-brand-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-semibold text-brand-gold mb-4">{APP_NAME}</h3>
            <p className="text-sm text-brand-light-gray leading-relaxed">
              {getText('footerAbout', 'Experience unparalleled hospitality and comfort. Your perfect getaway starts here, with premium amenities and exceptional service.')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-brand-gold mb-4">{getText('footerQuickLinks', 'Quick Links')}</h3>
            <ul className="space-y-2">
              <li><Link to="/rooms" className="text-sm hover:text-brand-gold transition-colors">{getText('footerRooms', 'Our Rooms')}</Link></li>
              <li><Link to="/#services" className="text-sm hover:text-brand-gold transition-colors">{getText('footerServices', 'Services')}</Link></li>
              <li><Link to="/#contact" className="text-sm hover:text-brand-gold transition-colors">{getText('footerContact', 'Contact Us')}</Link></li>
              <li><Link to="/#faq" className="text-sm hover:text-brand-gold transition-colors">{getText('footerFAQ', 'FAQ')}</Link></li>
            </ul>
          </div>

          {/* Contact Info & Social */}
          <div>
            <h3 className="text-lg font-semibold text-brand-gold mb-4">{getText('footerContactInfo', 'Contact Info')}</h3>
            <p className="text-sm text-brand-light-gray">123 Serene Avenue, Dream City, India</p>
            <p className="text-sm text-brand-light-gray">Phone: +91 98765 43210</p>
            <p className="text-sm text-brand-light-gray">Email: info@serenestays.com</p>
            <div className="mt-4 flex space-x-4">
              {/* Placeholder Social Icons */}
              <a href="#" className="text-brand-teal hover:text-brand-gold transition-colors"><span className="sr-only">Facebook</span>FB</a>
              <a href="#" className="text-brand-teal hover:text-brand-gold transition-colors"><span className="sr-only">Instagram</span>IG</a>
              <a href="#" className="text-brand-teal hover:text-brand-gold transition-colors"><span className="sr-only">Twitter</span>TW</a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-brand-midnight-blue-light pt-8 text-center">
          <p className="text-sm text-brand-gray">
            &copy; {currentYear} {APP_NAME}. {getText('footerRights', 'All rights reserved.')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
