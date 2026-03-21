import React, { useState } from 'react';

/* ── Calculator ── */
const Calculator: React.FC = () => {
    const [display, setDisplay] = useState('0');
    const [prev, setPrev] = useState<number | null>(null);
    const [op, setOp] = useState<string | null>(null);
    const [fresh, setFresh] = useState(true);

    const handleNum = (n: string) => {
        if (fresh) { setDisplay(n); setFresh(false); }
        else setDisplay(display === '0' ? n : display + n);
    };

    const handleOp = (o: string) => {
        setPrev(parseFloat(display));
        setOp(o);
        setFresh(true);
    };

    const handleEqual = () => {
        if (prev === null || !op) return;
        const cur = parseFloat(display);
        let res = 0;
        switch (op) {
            case '+': res = prev + cur; break;
            case '-': res = prev - cur; break;
            case '×': res = prev * cur; break;
            case '÷': res = cur !== 0 ? prev / cur : 0; break;
        }
        setDisplay(String(parseFloat(res.toFixed(8))));
        setPrev(null);
        setOp(null);
        setFresh(true);
    };

    const handleClear = () => {
        setDisplay('0'); setPrev(null); setOp(null); setFresh(true);
    };

    const buttons = ['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '-', '0', '.', '=', '+'];

    return (
        <div className="widget-calc">
            <div className="calc-display">{display}</div>
            <div className="calc-grid">
                <button className="calc-btn calc-clear" onClick={handleClear}>C</button>
                {buttons.map((b) => (
                    <button
                        key={b}
                        className={`calc-btn ${['+', '-', '×', '÷'].includes(b) ? 'calc-op' : ''} ${b === '=' ? 'calc-eq' : ''}`}
                        onClick={() => {
                            if (b === '=') handleEqual();
                            else if (['+', '-', '×', '÷'].includes(b)) handleOp(b);
                            else handleNum(b);
                        }}
                    >{b}</button>
                ))}
            </div>
        </div>
    );
};

/* ── Sticky Notes ── */
interface Note { id: string; text: string; color: string; }

const noteColors = ['#fbbf24', '#34d399', '#60a5fa', '#f472b6', '#c084fc'];

const StickyNotes: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>(() => {
        try {
            const saved = localStorage.getItem('onit_notes');
            return saved ? JSON.parse(saved) : [];
        } catch { return []; }
    });

    const save = (updated: Note[]) => {
        setNotes(updated);
        localStorage.setItem('onit_notes', JSON.stringify(updated));
    };

    const addNote = () => {
        const n: Note = {
            id: Math.random().toString(36).substr(2, 9),
            text: '',
            color: noteColors[notes.length % noteColors.length],
        };
        save([...notes, n]);
    };

    const updateNote = (id: string, text: string) => {
        save(notes.map(n => n.id === id ? { ...n, text } : n));
    };

    const removeNote = (id: string) => {
        save(notes.filter(n => n.id !== id));
    };

    return (
        <div className="widget-notes">
            <button className="note-add-btn" onClick={addNote}>
                <i className="fas fa-plus"></i> New Note
            </button>
            <div className="notes-grid">
                {notes.map(n => (
                    <div key={n.id} className="note-card" style={{ borderLeftColor: n.color }}>
                        <textarea
                            value={n.text}
                            onChange={(e) => updateNote(n.id, e.target.value)}
                            placeholder="Write something..."
                            rows={4}
                        />
                        <button className="note-del" onClick={() => removeNote(n.id)}>
                            <i className="fas fa-trash-alt"></i>
                        </button>
                    </div>
                ))}
                {notes.length === 0 && (
                    <p className="notes-empty">No notes yet. Click "New Note" to start!</p>
                )}
            </div>
        </div>
    );
};

/* ── Unit Converter ── */
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
        <div className="widget-converter">
            <div className="converter-tabs">
                {Object.keys(categories).map(c => (
                    <button key={c} className={`conv-tab ${c === cat ? 'active' : ''}`} onClick={() => changeCat(c)}>
                        {c}
                    </button>
                ))}
            </div>
            <div className="converter-body">
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
        </div>
    );
};

/* ── MAIN DRAWER ── */
type WidgetTab = 'calculator' | 'notes' | 'converter';

interface WidgetDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const WidgetDrawer: React.FC<WidgetDrawerProps> = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState<WidgetTab>('calculator');

    return (
        <div className={`widget-drawer-overlay ${isOpen ? 'open' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
            <div className={`widget-drawer ${isOpen ? 'open' : ''}`}>
                <div className="drawer-header">
                    <h3>Toolbox</h3>
                    <button className="drawer-close" onClick={onClose}><i className="fas fa-times"></i></button>
                </div>
                <div className="drawer-tabs">
                    {([
                        { key: 'calculator' as WidgetTab, icon: 'fa-calculator', label: 'Calculator' },
                        { key: 'notes' as WidgetTab, icon: 'fa-sticky-note', label: 'Notes' },
                        { key: 'converter' as WidgetTab, icon: 'fa-exchange-alt', label: 'Converter' },
                    ]).map(t => (
                        <button
                            key={t.key}
                            className={`drawer-tab ${activeTab === t.key ? 'active' : ''}`}
                            onClick={() => setActiveTab(t.key)}
                        >
                            <i className={`fas ${t.icon}`}></i>
                            <span>{t.label}</span>
                        </button>
                    ))}
                </div>
                <div className="drawer-content">
                    {activeTab === 'calculator' && <Calculator />}
                    {activeTab === 'notes' && <StickyNotes />}
                    {activeTab === 'converter' && <UnitConverter />}
                </div>
            </div>
        </div>
    );
};

export default WidgetDrawer;
