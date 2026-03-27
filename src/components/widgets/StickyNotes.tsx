import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInteractiveCard } from '../../hooks/useInteractiveCard';
import type { Note } from '../../types';
import { NOTE_COLORS, STORAGE_KEYS } from '../../constants';

const NoteCard: React.FC<{ 
    note: Note, 
    index: number, 
    onUpdate: (id: string, text: string) => void, 
    onRemove: (id: string) => void 
}> = ({ note, index, onUpdate, onRemove }) => {
    const spotlight = useInteractiveCard(10);
    
    return (
        <motion.div 
            className="note-card spotlight shimmer-border holo-shimmer" 
            onMouseMove={spotlight.onMouseMove}
            onMouseLeave={spotlight.onMouseLeave}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            style={{ 
                ...spotlight.style,
                borderLeftColor: note.color, 
                '--i': index 
            } as React.CSSProperties}
        >
            <textarea
                value={note.text}
                onChange={(e) => onUpdate(note.id, e.target.value)}
                placeholder="Write something..."
                rows={4}
            />
            <button className="note-del" onClick={() => onRemove(note.id)}>
                <i className="fas fa-trash-alt"></i>
            </button>
        </motion.div>
    );
};

const StickyNotes: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEYS.NOTES);
            return saved ? JSON.parse(saved) : [];
        } catch { return []; }
    });

    const save = (updated: Note[]) => {
        setNotes(updated);
        localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(updated));
    };

    const addNote = () => {
        const n: Note = {
            id: Math.random().toString(36).substr(2, 9),
            text: '',
            color: NOTE_COLORS[notes.length % NOTE_COLORS.length],
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
            <button className="note-add-btn holo-shimmer" onClick={addNote}>
                <i className="fas fa-plus"></i> New Note
            </button>
            <div className="notes-grid">
                <AnimatePresence>
                    {notes.map((n, i) => (
                        <NoteCard 
                            key={n.id} 
                            note={n} 
                            index={i} 
                            onUpdate={updateNote} 
                            onRemove={removeNote} 
                        />
                    ))}
                </AnimatePresence>
                {notes.length === 0 && (
                    <p className="notes-empty">No notes yet. Click "New Note" to start!</p>
                )}
            </div>
        </div>
    );
};

export default StickyNotes;
