import { useState, useRef, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import './index.css';
import type { ChatMessage, QuickChip, AppStatus } from './types';
import { STORAGE_KEYS, DEFAULT_USER_NAME, DEFAULT_THEME } from './constants';
import Header from './components/Header';
import Background3D from './components/Background3D';
import AssistantView from './components/AssistantView';
import InputController from './components/InputController';
import CameraView from './components/CameraView';
import ChatHistory from './components/ChatHistory';
import SettingsPanel from './components/SettingsPanel';
import WidgetDrawer from './components/WidgetDrawer';
import CommandChips from './components/CommandChips';
import OfflineIndicator from './components/OfflineIndicator';
import KeyboardShortcuts from './components/KeyboardShortcuts';
import { speechService } from './services/speechService';
import { cameraService } from './services/cameraService';
import { commandProcessor } from './services/commandProcessor';

function App() {
  const [messageContent, setMessageContent] = useState("Click 'Start' to wake me up!");
  const [inputValue, setInputValue] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<AppStatus>("Idle");
  const [userName, setUserName] = useState(localStorage.getItem(STORAGE_KEYS.USER_NAME) || DEFAULT_USER_NAME);
  const videoRef = useRef<HTMLVideoElement>(null);

  // New features state
  const [showWidgetDrawer, setShowWidgetDrawer] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const speakListenerRegistered = useRef(false);

  const addMessage = useCallback((text: string, sender: 'user' | 'assistant') => {
    const newMessage: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      text,
      sender,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  }, []);

  useEffect(() => {
    if (!speakListenerRegistered.current) {
      speakListenerRegistered.current = true;
      speechService.onSpeak((text) => {
        addMessage(text, 'assistant');
      });
      speechService.onStatusChange((speaking) => {
        setIsSpeaking(speaking);
      });
    }
  }, [addMessage]);

  const wishMe = useCallback((name: string) => {
    const hour = new Date().getHours();
    const greeting = hour >= 0 && hour < 12 ? "Good Morning" : hour >= 12 && hour < 17 ? "Good Afternoon" : "Good Evening";
    speechService.speak(`${greeting} ${name}!`);
  }, []);

  const handleStart = () => {
    setIsStarted(true);
    setStatus("Active");
    setMessageContent(`Initializing OnIt.. Welcome ${userName}!`);
    speechService.speak(`Initializing OnIt! Welcome ${userName}!`);
    setTimeout(() => wishMe(userName), 1500);
  };

  const handleMicClick = () => {
    if (status === 'Listening') {
      // Stop listening
      speechService.stopListening();
      setStatus("Active");
      setLiveTranscript('');
      setMessageContent("Stopped listening.");
      return;
    }
    setStatus("Listening");
    setMessageContent("Listening....");
    setLiveTranscript('');
    speechService.startListening(
      (transcript) => {
        setStatus("Active");
        setLiveTranscript('');
        setMessageContent(transcript);
        addMessage(transcript, 'user');
        commandProcessor.processCommand(transcript);
      },
      (error) => {
        setStatus("Active");
        setLiveTranscript('');
        console.error("Speech Error:", error);
        const errMsg = error === 'no-speech'
          ? "I didn't catch that. Please try again."
          : error === 'network'
            ? "I'm having network trouble. Please check your connection."
            : `I had a problem: ${error}`;
        setMessageContent(errMsg);
        speechService.speak(errMsg);
      },
      (interimText) => {
        setLiveTranscript(interimText);
      }
    );
  };

  const handleSend = () => {
    if (inputValue.trim() !== "") {
      const text = inputValue.trim();
      setMessageContent(text);
      addMessage(text, 'user');
      commandProcessor.processCommand(text);
      setInputValue("");
    }
  };

  const handleRerun = (text: string) => {
    setMessageContent(text);
    addMessage(text, 'user');
    commandProcessor.processCommand(text);
  };

  const handleOpenCamera = useCallback(async () => {
    setShowCamera(true);
    setStatus("Active");
    requestAnimationFrame(async () => {
      if (videoRef.current) {
        try {
          await cameraService.startCamera(videoRef.current);
          speechService.speak("Camera is now on.");
        } catch {
          speechService.speak("Sorry, I can't access the camera.");
        }
      }
    });
  }, []);

  const handleCloseCamera = () => {
    cameraService.stopCamera();
    setShowCamera(false);
    speechService.speak("Camera is closed.");
  };

  const handleStopSpeech = () => {
    speechService.cancelSpeech();
    setIsSpeaking(false);
  };

  const handleOpenCameraRef = useRef(handleOpenCamera);
  useEffect(() => {
    handleOpenCameraRef.current = handleOpenCamera;
  }, [handleOpenCamera]);

  useEffect(() => {
    const existing = commandProcessor.getAvailableCommands().find(c => c.name === 'Open Camera');
    if (!existing) {
      commandProcessor.registerCommand({
        name: 'Open Camera',
        keywords: ['open camera'],
        action: () => handleOpenCameraRef.current(),
        description: 'Opens the camera feed.',
      });
    }
  }, []);

  const handleSettingsChange = (settings: { userName: string; theme: string }) => {
    setUserName(settings.userName);
    document.body.setAttribute('data-theme', settings.theme);
    localStorage.setItem(STORAGE_KEYS.THEME, settings.theme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || DEFAULT_THEME;
    document.body.setAttribute('data-theme', savedTheme);
  }, []);

  // Keyboard shortcuts handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't catch shortcuts when typing in an input
      const tag = (e.target as HTMLElement).tagName;
      const isInput = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';

      if (e.key === '?' && !isInput) {
        e.preventDefault();
        setShowShortcuts(prev => !prev);
        return;
      }

      if (e.key === 'Escape') {
        setShowShortcuts(false);
        setShowWidgetDrawer(false);
        setShowSettings(false);
        handleStopSpeech();
        if (focusMode) setFocusMode(false);
        return;
      }

      if ((e.key === '/' || e.key === ' ') && !isInput) {
        e.preventDefault();
        inputRef.current?.focus();
        return;
      }

      if (e.ctrlKey && e.key === 'm') {
        e.preventDefault();
        if (isStarted) handleMicClick();
        return;
      }

      if (e.ctrlKey && e.key === 't') {
        e.preventDefault();
        setShowWidgetDrawer(prev => !prev);
        return;
      }

      if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        setFocusMode(prev => !prev);
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isStarted, focusMode, status]);

  // Quick-action chips
  const quickChips: QuickChip[] = [
    { label: 'Time', icon: 'fa-clock', action: () => { commandProcessor.processCommand('what time'); } },
    { label: 'Weather', icon: 'fa-cloud-sun', action: () => { commandProcessor.processCommand('weather'); } },
    { label: 'Quick Advice', icon: 'fa-lightbulb', action: () => { commandProcessor.processCommand('advice'); } },
    { label: 'YouTube', icon: 'fa-play', action: () => { commandProcessor.processCommand('open youtube'); } },
    { label: 'Camera', icon: 'fa-camera', action: () => { handleOpenCameraRef.current(); } },
    { label: 'Joke', icon: 'fa-laugh', action: () => { commandProcessor.processCommand('tell me a joke'); } },
    { label: 'Toolbox', icon: 'fa-toolbox', action: () => { setShowWidgetDrawer(true); } },
    { label: 'Help', icon: 'fa-question-circle', action: () => { commandProcessor.processCommand('help'); } },
  ];

  return (
    <div className={`main ${focusMode ? 'focus-mode' : ''}`}>
      <Background3D />
      {/* Offline Indicator */}
      <OfflineIndicator status={status} />

      {/* Top bar buttons */}
      <div className="top-bar">
        <button
          className="top-btn"
          onClick={() => setShowWidgetDrawer(true)}
          aria-label="Open toolbox"
          title="Toolbox (Ctrl+T)"
        >
          <i className="fas fa-th-large"></i>
        </button>
        <button
          className={`top-btn ${focusMode ? 'active' : ''}`}
          onClick={() => setFocusMode(!focusMode)}
          aria-label="Toggle focus mode"
          title="Focus Mode (Ctrl+F)"
        >
          <i className="fas fa-expand"></i>
        </button>
        <button
          className="top-btn"
          onClick={() => setShowSettings(true)}
          aria-label="Open settings"
          title="Settings"
        >
          <i className="fas fa-cog"></i>
        </button>
      </div>

      <AnimatePresence>
        {showSettings && (
          <SettingsPanel
            onSettingsChange={handleSettingsChange}
            onClose={() => setShowSettings(false)}
          />
        )}
      </AnimatePresence>

      <WidgetDrawer isOpen={showWidgetDrawer} onClose={() => setShowWidgetDrawer(false)} />
      <AnimatePresence>
        {showShortcuts && <KeyboardShortcuts onClose={() => setShowShortcuts(false)} />}
      </AnimatePresence>

      {!isStarted ? (
        <div className="start-screen">
          <Header />
          <AssistantView status="Idle" />
          <button className="start-button" onClick={handleStart} aria-label="Start the assistant">
            Start Assistant
          </button>
          <p className="start-hint">Or press <kbd>Enter</kbd></p>
        </div>
      ) : (
        <>
          {!focusMode && <Header />}
          <AssistantView status={status} />

          {!focusMode && (
            <>
              <CommandChips chips={quickChips} />

              <ChatHistory messages={messages} onRerun={handleRerun} />

              {showCamera && (
                <CameraView
                  videoRef={videoRef}
                  onClose={handleCloseCamera}
                />
              )}
            </>
          )}

          <InputController
            messageContent={messageContent}
            inputValue={inputValue}
            liveTranscript={liveTranscript}
            isListening={status === 'Listening'}
            isSpeaking={isSpeaking}
            onInputChange={setInputValue}
            onMicClick={handleMicClick}
            onSend={handleSend}
            onStopSpeech={handleStopSpeech}
            inputRef={inputRef}
          />
        </>
      )}
    </div>
  );
}

export default App;
