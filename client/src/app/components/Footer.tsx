import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Astrology AI</h3>
            <p className="text-sm">
              Personalized astrological insights powered by AI, focusing on delivering tailored astrological 
              interpretations and guidance.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4 text-white">Features</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/dashboard/personal" className="hover:text-white transition">
                  Personal Growth
                </Link>
              </li>
              <li>
                <Link href="/dashboard/relationships" className="hover:text-white transition">
                  Relationships
                </Link>
              </li>
              <li>
                <Link href="/chat" className="hover:text-white transition">
                  AI Copilot
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4 text-white">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="hover:text-white transition">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4 text-white">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:support@astrologyai.com" className="hover:text-white transition">
                  support@astrologyai.com
                </a>
              </li>
              <li>
                <a href="https://twitter.com/astrologyai" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                  @astrologyai
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Astrology AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;