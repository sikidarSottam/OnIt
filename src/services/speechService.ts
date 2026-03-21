export interface SpeechRecognitionResult {
    transcript: string;
    isFinal: boolean;
}

export type SpeechResultCallback = (result: string) => void;
export type SpeechErrorCallback = (error: string) => void;
export type InterimCallback = (interimText: string) => void;

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
            this.recognition.interimResults = true; // Enable interim results for live transcript
            this.recognition.lang = 'en-US';
        }

        this.loadVoices();
        this.synthesis.addEventListener('voiceschanged', () => this.loadVoices());
    }

    private loadVoices() {
        const available = this.synthesis.getVoices();
        if (available.length > 0) {
            this.voices = available;
        }
    }

    getVoices(): SpeechSynthesisVoice[] {
        if (this.voices.length === 0) {
            this.voices = this.synthesis.getVoices();
        }
        return this.voices;
    }

    onSpeak(callback: (text: string) => void): () => void {
        this.onSpeakListeners.push(callback);
        return () => {
            this.onSpeakListeners = this.onSpeakListeners.filter(l => l !== callback);
        };
    }

    startListening(
        onResult: SpeechResultCallback,
        onError: SpeechErrorCallback,
        onInterim?: InterimCallback
    ) {
        if (!this.recognition) {
            onError("Speech Recognition is not supported in this browser.");
            return;
        }

        this.recognition.onresult = (event: any) => {
            let interimTranscript = '';
            let finalTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcript;
                } else {
                    interimTranscript += transcript;
                }
            }

            if (interimTranscript && onInterim) {
                onInterim(interimTranscript);
            }

            if (finalTranscript) {
                onResult(finalTranscript);
            }
        };

        this.recognition.onerror = (event: any) => {
            onError(event.error as string);
        };

        this.recognition.onend = () => {
            // recognition ended
        };

        try {
            this.recognition.start();
        } catch (e) {
            this.recognition.abort();
            setTimeout(() => {
                try { this.recognition.start(); } catch { /* ignore */ }
            }, 300);
        }
    }

    stopListening() {
        if (this.recognition) {
            try {
                this.recognition.stop();
            } catch { /* ignore */ }
        }
    }

    speak(text: string) {
        this.onSpeakListeners.forEach(listener => listener(text));
        this.synthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        const voices = this.getVoices();

        const preferred =
            voices.find(v => v.name === 'Google UK English Female') ||
            voices.find(v => v.name === 'Google US English') ||
            voices.find(v => v.name.includes('Aria Online (Natural)')) ||
            voices.find(v => v.name.includes('Jenny Online (Natural)')) ||
            voices.find(v => v.name === 'Samantha') ||
            voices.find(v => v.name.includes('Zira')) ||
            voices.find(v => v.name.toLowerCase().includes('female')) ||
            voices.find(v => v.lang.startsWith('en-'));

        if (preferred) {
            utterance.voice = preferred;
        }

        utterance.rate = 1.05;
        utterance.volume = 1;
        utterance.pitch = 1.1;

        this.synthesis.speak(utterance);
    }

    cancelSpeech() {
        this.synthesis.cancel();
    }
}

export const speechService = new SpeechService();
