import type { SpeechResultCallback, SpeechErrorCallback, InterimCallback } from '../types';

class SpeechService {
    private recognition: any = null;
    private synthesis: SpeechSynthesis = window.speechSynthesis;
    private voices: SpeechSynthesisVoice[] = [];
    private onSpeakListeners: ((text: string) => void)[] = [];
    
    // Status tracking
    private isCurrentlySpeaking: boolean = false;
    private onStatusListeners: ((isSpeaking: boolean) => void)[] = [];

    constructor() {
        const SpeechRecognitionAPI =
            (window as any).SpeechRecognition ||
            (window as any).webkitSpeechRecognition;

        if (SpeechRecognitionAPI) {
            this.recognition = new SpeechRecognitionAPI();
            this.recognition.continuous = false;
            this.recognition.interimResults = true;
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

    private setSpeaking(val: boolean) {
        this.isCurrentlySpeaking = val;
        this.onStatusListeners.forEach(l => l(val));
    }

    get isSpeaking(): boolean {
        return this.isCurrentlySpeaking;
    }

    onStatusChange(callback: (isSpeaking: boolean) => void): () => void {
        this.onStatusListeners.push(callback);
        return () => {
            this.onStatusListeners = this.onStatusListeners.filter(l => l !== callback);
        };
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
        this.cancelSpeech();

        const utterance = new SpeechSynthesisUtterance(text);
        const voices = this.getVoices();

        const preferred =
            voices.find(v => v.name === 'Google UK English Female') ||
            voices.find(v => v.name === 'Google US English') ||
            voices.find(v => v.lang.startsWith('en-'));

        if (preferred) {
            utterance.voice = preferred;
        }

        utterance.rate = 1.05;
        
        utterance.onstart = () => this.setSpeaking(true);
        utterance.onend = () => this.setSpeaking(false);
        utterance.onerror = () => this.setSpeaking(false);

        this.synthesis.speak(utterance);
    }

    cancelSpeech() {
        this.synthesis.cancel();
        this.setSpeaking(false);
    }
}

export const speechService = new SpeechService();
