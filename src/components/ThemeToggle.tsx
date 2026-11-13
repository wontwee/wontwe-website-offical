import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import './ThemeToggle.css';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', showLabel = false }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className={`w-theme-toggle ${className}`}
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'bright (light)' : 'night (dark)'} mode`}
      title={`Switch to ${isDark ? 'Bright Mode' : 'Night Mode'}`}
    >
      <span className="w-theme-toggle__icon-wrap" aria-hidden="true">
        {isDark ? (
          <Sun size={16} className="w-theme-toggle__icon w-theme-toggle__icon--sun" />
        ) : (
          <Moon size={16} className="w-theme-toggle__icon w-theme-toggle__icon--moon" />
        )}
      </span>
      {showLabel && (
        <span className="w-theme-toggle__label">
          {isDark ? 'BRIGHT MODE' : 'NIGHT MODE'}
        </span>
      )}
    </button>
  );
};
