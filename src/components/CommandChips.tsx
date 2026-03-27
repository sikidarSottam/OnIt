import React from 'react';
import type { QuickChip } from '../types';

interface CommandChipsProps {
    chips: QuickChip[];
}

const CommandChips: React.FC<CommandChipsProps> = ({ chips }) => {
    return (
        <div className="command-chips-container">
            <div className="command-chips-scroll">
                {chips.map((chip, i) => (
                    <button
                        key={i}
                        className="command-chip"
                        onClick={chip.action}
                        title={chip.label}
                        style={{ '--i': i } as React.CSSProperties}
                    >
                        <i className={`fas ${chip.icon}`}></i>
                        <span>{chip.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CommandChips;
