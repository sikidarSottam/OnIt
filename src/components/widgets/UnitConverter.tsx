import React, { useState } from 'react';
import { motion } from 'framer-motion';

const categories: Record<string, { units: string[]; convert: (v: number, from: string, to: string) => number }> = {
    Length: {
        units: ['m', 'km', 'cm', 'mm', 'mi', 'ft', 'in'],
        convert: (v, from, to) => {
            const toM: Record<string, number> = { m: 1, km: 1000, cm: 0.01, mm: 0.001, mi: 1609.344, ft: 0.3048, in: 0.0254 };
            return (v * toM[from]) / toM[to];
        },
    },
    Weight: {
        units: ['kg', 'g', 'mg', 'lb', 'oz'],
        convert: (v, from, to) => {
            const toKg: Record<string, number> = { kg: 1, g: 0.001, mg: 0.000001, lb: 0.453592, oz: 0.0283495 };
            return (v * toKg[from]) / toKg[to];
        },
    },
    Temperature: {
        units: ['°C', '°F', 'K'],
        convert: (v, from, to) => {
            let c = from === '°C' ? v : from === '°F' ? (v - 32) * 5 / 9 : v - 273.15;
            if (to === '°C') return c;
            if (to === '°F') return c * 9 / 5 + 32;
            return c + 273.15;
        },
    },
};

const UnitConverter: React.FC = () => {
    const [cat, setCat] = useState('Length');
    const [fromUnit, setFromUnit] = useState(categories.Length.units[0]);
    const [toUnit, setToUnit] = useState(categories.Length.units[1]);
    const [value, setValue] = useState('1');

    const changeCat = (c: string) => {
        setCat(c);
        setFromUnit(categories[c].units[0]);
        setToUnit(categories[c].units[1]);
        setValue('1');
    };

    const result = categories[cat].convert(parseFloat(value) || 0, fromUnit, toUnit);

    return (
        <motion.div 
            className="widget-converter"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
        >
            <div className="converter-tabs">
                {Object.keys(categories).map(c => (
                    <button key={c} className={`conv-tab ${c === cat ? 'active' : ''}`} onClick={() => changeCat(c)}>
                        {c}
                    </button>
                ))}
            </div>
            <div className="converter-body glass-card">
                <div className="conv-row">
                    <input type="number" value={value} onChange={e => setValue(e.target.value)} className="conv-input" />
                    <select value={fromUnit} onChange={e => setFromUnit(e.target.value)} className="conv-select">
                        {categories[cat].units.map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                </div>
                <div className="conv-arrow"><i className="fas fa-exchange-alt"></i></div>
                <div className="conv-row">
                    <div className="conv-result">{parseFloat(result.toFixed(6))}</div>
                    <select value={toUnit} onChange={e => setToUnit(e.target.value)} className="conv-select">
                        {categories[cat].units.map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                </div>
            </div>
        </motion.div>
    );
};

export default UnitConverter;
