// Shared Types for OnIt

export interface ChatMessage {
    id: string;
    text: string;
    sender: 'user' | 'assistant';
    timestamp: Date;
}

export interface QuickChip {
    label: string;
    icon: string;
    action: () => void;
}

export interface Note {
    id: string;
    text: string;
    color: string;
}

export type AppStatus = "Idle" | "Active" | "Listening";

export type WidgetTab = 'calculator' | 'notes' | 'converter';

export interface Command {
    name: string;
    keywords: string[];
    action: (args?: any) => void | Promise<void>;
    description?: string;
}
export interface SpeechRecognitionResult {
    transcript: string;
    isFinal: boolean;
}

export type SpeechResultCallback = (result: string) => void;
export type SpeechErrorCallback = (error: string) => void;
export type InterimCallback = (interimText: string) => void;
