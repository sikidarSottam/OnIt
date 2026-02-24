export interface SpeechRecognitionResult {
    transcript: string;
    isFinal: boolean;
}

export type SpeechResultCallback = (result: string) => void;
export type SpeechErrorCallback = (error: string) => void;

class SpeechService {
    private recognition: any = null;
    private synthesis: SpeechSynthesis = window.speechSynthesis;
    private voices: SpeechSynthesisVoice[] = [];
    private onSpeakListeners: ((text: string) => void)[] = [];

    constructor() {
        const SpeechRecognitionAPI =
            (window as any).SpeechRecognition ||
            (window as any).webkitSpeechRecognition;

        if (SpeechRecognitionAPI) {
            this.recognition = new SpeechRecognitionAPI();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'en-US';
        }

        this.loadVoices();
        // voiceschanged fires asynchronously in most browsers
        this.synthesis.addEventListener('voiceschanged', () => this.loadVoices());
    }

    private loadVoices() {
        const available = this.synthesis.getVoices();
        if (available.length > 0) {
            this.voices = available;
        }
    }

    getVoices(): SpeechSynthesisVoice[] {
        // If voices haven't loaded yet, try fetching them directly
        if (this.voices.length === 0) {
            this.voices = this.synthesis.getVoices();
        }
        return this.voices;
    }

    /**
     * Register a listener for spoken messages.
     * Returns an unsubscribe function.
     */
    onSpeak(callback: (text: string) => void): () => void {
        this.onSpeakListeners.push(callback);
        // Return unsubscribe function
        return () => {
            this.onSpeakListeners = this.onSpeakListeners.filter(l => l !== callback);
        };
    }

    startListening(onResult: SpeechResultCallback, onError: SpeechErrorCallback) {
        if (!this.recognition) {
            onError("Speech Recognition is not supported in this browser.");
            return;
        }

        this.recognition.onresult = (event: any) => {
            const transcript = event.results[event.resultIndex][0].transcript;
            onResult(transcript);
        };

        this.recognition.onerror = (event: any) => {
            onError(event.error as string);
        };

        this.recognition.onend = () => {
            // recognition ended – no action needed, state is managed by App
        };

        try {
            this.recognition.start();
        } catch (e) {
            // Already started or another error – abort and restart
            this.recognition.abort();
            setTimeout(() => {
                try { this.recognition.start(); } catch { /* ignore */ }
            }, 300);
        }
    }

    speak(text: string, voiceName?: string) {
        // Notify all registered listeners
        this.onSpeakListeners.forEach(listener => listener(text));

        // Cancel any ongoing speech before speaking
        this.synthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        const voices = this.getVoices();

        if (voiceName) {
            const selected = voices.find(v => v.name === voiceName);
            if (selected) utterance.voice = selected;
        } else {
            // Default: prefer natural/female English voices
            const preferred =
                voices.find(v => v.name === 'Google UK English Female') ||
                voices.find(v => v.name === 'Google US English') ||
                voices.find(v => v.name.includes('Female')) ||
                voices.find(v => v.name.includes('Zira')) ||
                voices.find(v => v.name.includes('Samantha')) ||
                voices.find(v => v.lang.startsWith('en-'));
            if (preferred) utterance.voice = preferred;
        }

        utterance.rate = 1;
        utterance.volume = 1;
        utterance.pitch = 1.1;

        this.synthesis.speak(utterance);
    }

    cancelSpeech() {
        this.synthesis.cancel();
    }
}

export const speechService = new SpeechService();
