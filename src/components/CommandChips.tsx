import React from 'react';

export interface QuickChip {
    label: string;
    icon: string;
    action: () => void;
}

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
