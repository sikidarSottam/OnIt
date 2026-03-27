import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Calculator from './widgets/Calculator';
import StickyNotes from './widgets/StickyNotes';
import UnitConverter from './widgets/UnitConverter';

/* ── MAIN DRAWER ── */
type WidgetTab = 'calculator' | 'notes' | 'converter';

interface WidgetDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const WidgetDrawer: React.FC<WidgetDrawerProps> = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState<WidgetTab>('calculator');

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    className="widget-drawer-overlay open"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
                >
                    <motion.div 
                        className="widget-drawer open glass-card"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    >
                        <div className="drawer-header">
                            <h3>Toolbox</h3>
                            <button className="drawer-close" onClick={onClose}><i className="fas fa-times"></i></button>
                        </div>
                        <div className="drawer-tabs">
                            {([
                                { key: 'calculator' as WidgetTab, icon: 'fa-calculator', label: 'Calculator' },
                                { key: 'notes' as WidgetTab, icon: 'fa-sticky-note', label: 'Notes' },
                                { key: 'converter' as WidgetTab, icon: 'fa-exchange-alt', label: 'Converter' },
                            ]).map((t, i) => (
                                <button
                                    key={t.key}
                                    className={`drawer-tab holo-shimmer ${activeTab === t.key ? 'active' : ''}`}
                                    onClick={() => setActiveTab(t.key)}
                                    style={{ '--i': i } as React.CSSProperties}
                                >
                                    <i className={`fas ${t.icon}`}></i>
                                    <span>{t.label}</span>
                                </button>
                            ))}
                        </div>
                        <div className="drawer-content">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {activeTab === 'calculator' && <Calculator />}
                                    {activeTab === 'notes' && <StickyNotes />}
                                    {activeTab === 'converter' && <UnitConverter />}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default WidgetDrawer;
