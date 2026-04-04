import React from 'react';
import { motion } from 'framer-motion';

interface NavbarProps {
  onOpenToolbox: () => void;
  onToggleFocusMode: () => void;
  onOpenSettings: () => void;
  focusMode: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  onOpenToolbox,
  onToggleFocusMode,
  onOpenSettings,
  focusMode
}) => {
  return (
    <motion.nav 
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <div className="navbar-logo">
        <div className="logo-icon">
          <i className="fas fa-robot"></i>
        </div>
        <span className="logo-text">OnIt</span>
      </div>

      <div className="top-bar">
        <button
          className="top-btn"
          onClick={onOpenToolbox}
          aria-label="Open toolbox"
          title="Toolbox (Ctrl+T)"
        >
          <i className="fas fa-th-large"></i>
        </button>
        <button
          className={`top-btn ${focusMode ? 'active' : ''}`}
          onClick={onToggleFocusMode}
          aria-label="Toggle focus mode"
          title="Focus Mode (Ctrl+F)"
        >
          <i className="fas fa-expand"></i>
        </button>
        <button
          className="top-btn"
          onClick={onOpenSettings}
          aria-label="Open settings"
          title="Settings"
        >
          <i className="fas fa-cog"></i>
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
