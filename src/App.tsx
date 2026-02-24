import { useState, useRef, useEffect, useCallback } from 'react';
import './index.css';
import Header from './components/Header';
import AssistantView from './components/AssistantView';
import InputController from './components/InputController';
import CameraView from './components/CameraView';
import type { ChatMessage } from './components/ChatHistory';
import ChatHistory from './components/ChatHistory';
import SettingsPanel from './components/SettingsPanel';
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
  const [status, setStatus] = useState<"Idle" | "Active" | "Listening">("Idle");
  const [userName, setUserName] = useState(localStorage.getItem('onit_userName') || 'Boss');
  const [preferredVoice, setPreferredVoice] = useState(localStorage.getItem('onit_preferredVoice') || '');
  const videoRef = useRef<HTMLVideoElement>(null);

  // Use a ref so we can track whether listener was registered without causing re-renders
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

  // Register the speak listener ONCE using a ref guard
  useEffect(() => {
    if (!speakListenerRegistered.current) {
      speakListenerRegistered.current = true;
      speechService.onSpeak((text) => {
        addMessage(text, 'assistant');
      });
    }
  }, [addMessage]);

  const wishMe = useCallback((name: string, voice: string) => {
    const hour = new Date().getHours();
    const greeting = hour >= 0 && hour < 12 ? "Good Morning" : hour >= 12 && hour < 17 ? "Good Afternoon" : "Good Evening";
    speechService.speak(`${greeting} ${name}!`, voice);
  }, []);

  const handleStart = () => {
    setIsStarted(true);
    setStatus("Active");
    setMessageContent(`Initializing OnIt.. Welcome ${userName}!`);
    speechService.speak(`Initializing OnIt! Welcome ${userName}!`, preferredVoice);
    // Slight delay so the first speech doesn't overlap
    setTimeout(() => wishMe(userName, preferredVoice), 1500);
  };

  const handleMicClick = () => {
    setStatus("Listening");
    setMessageContent("Listening....");
    speechService.startListening(
      (transcript) => {
        setStatus("Active");
        setMessageContent(transcript);
        addMessage(transcript, 'user');
        commandProcessor.processCommand(transcript);
      },
      (error) => {
        setStatus("Active");
        console.error("Speech Error:", error);
        const errMsg = error === 'no-speech'
          ? "I didn't catch that. Please try again."
          : error === 'network'
            ? "I'm having network trouble. Please check your connection."
            : `I had a problem: ${error}`;
        setMessageContent(errMsg);
        speechService.speak(errMsg, preferredVoice);
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

  // handleOpenCamera must use a stable reference for the useEffect below
  const handleOpenCamera = useCallback(async () => {
    setShowCamera(true);
    setStatus("Active");
    // Wait for React to render the video element before accessing it
    requestAnimationFrame(async () => {
      if (videoRef.current) {
        try {
          await cameraService.startCamera(videoRef.current);
          speechService.speak("Camera is now on.", preferredVoice);
        } catch {
          speechService.speak("Sorry, I can't access the camera.", preferredVoice);
        }
      }
    });
  }, [preferredVoice]);

  const handleCloseCamera = () => {
    cameraService.stopCamera();
    setShowCamera(false);
    speechService.speak("Camera is closed.", preferredVoice);
  };

  // Register the 'open camera' command once; update its reference via a ref
  const handleOpenCameraRef = useRef(handleOpenCamera);
  useEffect(() => {
    handleOpenCameraRef.current = handleOpenCamera;
  }, [handleOpenCamera]);

  useEffect(() => {
    // Register if not already registered
    const existing = commandProcessor.getAvailableCommands().find(c => c.name === 'Open Camera');
    if (!existing) {
      commandProcessor.registerCommand({
        name: 'Open Camera',
        keywords: ['open camera'],
        action: () => handleOpenCameraRef.current(),
        description: 'Opens the camera feed.',
      });
    }
  }, []); // Only once on mount

  const handleSettingsChange = (settings: { userName: string; preferredVoice: string; theme: string }) => {
    setUserName(settings.userName);
    setPreferredVoice(settings.preferredVoice);
    // Apply theme to the body so the whole page gets it
    document.body.setAttribute('data-theme', settings.theme);
    localStorage.setItem('onit_theme', settings.theme);
  };

  // Apply saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('onit_theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
  }, []);

  return (
    <div className="main">
      <button
        className="settings-toggle"
        onClick={() => setShowSettings(true)}
        aria-label="Open settings"
        title="Settings"
      >
        <i className="fas fa-cog"></i>
      </button>

      {showSettings && (
        <SettingsPanel
          onSettingsChange={handleSettingsChange}
          onClose={() => setShowSettings(false)}
        />
      )}

      {!isStarted ? (
        <div className="start-screen">
          <Header />
          <AssistantView status="Idle" />
          <button className="start-button" onClick={handleStart} aria-label="Start the assistant">
            Start Assistant
          </button>
        </div>
      ) : (
        <>
          <Header />
          <AssistantView status={status} />

          <ChatHistory messages={messages} />

          {showCamera && (
            <CameraView
              videoRef={videoRef}
              onClose={handleCloseCamera}
            />
          )}

          <InputController
            messageContent={messageContent}
            inputValue={inputValue}
            onInputChange={setInputValue}
            onMicClick={handleMicClick}
            onSend={handleSend}
          />
        </>
      )}
    </div>
  );
}

export default App;
