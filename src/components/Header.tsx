import React, { useState } from 'react';
import { Heart, BookOpen, Activity, LogIn, UserPlus, User, LogOut, Menu, X } from 'lucide-react';
import { AuthModal } from './AuthModal';
import type { User as UserType } from '../types';

interface HeaderProps {
  activeSection: 'screening' | 'exercises' | 'journal';
  onSectionChange: (section: 'screening' | 'exercises' | 'journal') => void;
  user: UserType | null;
  onLogout: () => void;
  onLogin: (email: string, password: string) => Promise<void>;
  onSignup: (email: string, password: string) => Promise<void>;
}

export function Header({ 
  activeSection, 
  onSectionChange, 
  user, 
  onLogout,
  onLogin,
  onSignup
}: HeaderProps) {
  const [authMode, setAuthMode] = useState<'login' | 'signup' | null>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleAuth = async (email: string, password: string) => {
    try {
      if (authMode === 'login') {
        await onLogin(email, password);
      } else {
        await onSignup(email, password);
      }
    } catch (error) {
      throw new Error('Authentication failed');
    }
  };

  const NavLinks = () => (
    <>
      <button
        onClick={() => {
          onSectionChange('screening');
          setIsMobileMenuOpen(false);
        }}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
          activeSection === 'screening'
            ? 'bg-purple-100 text-purple-700'
            : 'text-gray-600 hover:text-purple-600'
        }`}
      >
        <Activity className="w-5 h-5" />
        <span>Screening</span>
      </button>
      
      <button
        onClick={() => {
          onSectionChange('exercises');
          setIsMobileMenuOpen(false);
        }}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
          activeSection === 'exercises'
            ? 'bg-purple-100 text-purple-700'
            : 'text-gray-600 hover:text-purple-600'
        }`}
      >
        <Heart className="w-5 h-5" />
        <span>Exercises</span>
      </button>
      
      <button
        onClick={() => {
          onSectionChange('journal');
          setIsMobileMenuOpen(false);
        }}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
          activeSection === 'journal'
            ? 'bg-purple-100 text-purple-700'
            : 'text-gray-600 hover:text-purple-600'
        }`}
      >
        <BookOpen className="w-5 h-5" />
        <span>Journal</span>
      </button>
    </>
  );

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="w-8 h-8 text-purple-600" />
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">MindHaven</h1>
              <p className="text-sm text-gray-600 hidden md:block">A safe space for mental wellness</p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <nav className="flex space-x-6">
              <NavLinks />
            </nav>

            <div className="relative">
              {user ? (
                <>
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors"
                  >
                    <User className="w-5 h-5" />
                  </button>

                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user.email}</p>
                      </div>
                      <button
                        onClick={() => {
                          onLogout();
                          setShowProfileMenu(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign out</span>
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setAuthMode('login')}
                    className="flex items-center space-x-2 px-4 py-2 text-purple-600 hover:text-purple-700 transition-colors"
                  >
                    <LogIn className="w-5 h-5" />
                    <span>Log In</span>
                  </button>
                  <button
                    onClick={() => setAuthMode('signup')}
                    className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <UserPlus className="w-5 h-5" />
                    <span>Sign Up</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-2">
              <NavLinks />
            </nav>
            {user ? (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="px-4 py-2">
                  <p className="text-sm font-medium text-gray-900">{user.email}</p>
                </div>
                <button
                  onClick={() => {
                    onLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign out</span>
                </button>
              </div>
            ) : (
              <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col space-y-2">
                <button
                  onClick={() => {
                    setAuthMode('login');
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 px-4 py-2 text-purple-600 hover:text-purple-700 transition-colors"
                >
                  <LogIn className="w-5 h-5" />
                  <span>Log In</span>
                </button>
                <button
                  onClick={() => {
                    setAuthMode('signup');
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <UserPlus className="w-5 h-5" />
                  <span>Sign Up</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <AuthModal
        isOpen={authMode !== null}
        onClose={() => setAuthMode(null)}
        mode={authMode || 'login'}
        onSubmit={handleAuth}
      />
    </header>
  );
}