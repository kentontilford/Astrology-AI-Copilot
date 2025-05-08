import React from 'react';
import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

const Header = () => {
  return (
    <header className="bg-opacity-80 backdrop-blur-md bg-gray-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-cosmic-purple to-cosmic-blue bg-clip-text text-transparent">
              Astrology AI
            </span>
          </Link>
        </div>
        
        <nav className="hidden md:flex space-x-8 text-sm">
          <SignedIn>
            <Link href="/dashboard/personal" className="hover:text-indigo-300 transition">
              Personal Growth
            </Link>
            <Link href="/dashboard/relationships" className="hover:text-indigo-300 transition">
              Relationships
            </Link>
            <Link href="/chat" className="hover:text-indigo-300 transition">
              AI Copilot
            </Link>
            <Link href="/profiles" className="hover:text-indigo-300 transition">
              Birth Profiles
            </Link>
          </SignedIn>
        </nav>
        
        <div className="flex items-center space-x-4">
          <SignedIn>
            <Link href="/settings" className="text-sm hover:text-indigo-300 transition mr-2">
              Settings
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          
          <SignedOut>
            <Link href="/auth/sign-in" className="text-sm hover:text-indigo-300 transition">
              Sign In
            </Link>
            <Link 
              href="/auth/sign-up" 
              className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700 transition"
            >
              Sign Up
            </Link>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Header;