import React, { useState } from 'react';
import { motion } from 'framer-motion';

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
        <motion.div 
            className="widget-calc"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
        >
            <div className="calc-display">{display}</div>
            <div className="calc-grid">
                <button className="calc-btn calc-clear holo-shimmer" onClick={handleClear}>C</button>
                {buttons.map((b, i) => (
                    <button
                        key={b}
                        className={`calc-btn holo-shimmer ${['+', '-', '×', '÷'].includes(b) ? 'calc-op' : ''} ${b === '=' ? 'calc-eq' : ''}`}
                        onClick={() => {
                            if (b === '=') handleEqual();
                            else if (['+', '-', '×', '÷'].includes(b)) handleOp(b);
                            else handleNum(b);
                        }}
                        style={{ '--i': i } as React.CSSProperties}
                    >{b}</button>
                ))}
            </div>
        </motion.div>
    );
};

export default Calculator;
