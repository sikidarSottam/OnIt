import { useState, useEffect, useRef } from 'react';
import './index.css';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

function App() {
  const [messageContent, setMessageContent] = useState("Message box");
  const [inputValue, setInputValue] = useState("");
  const recognitionRef = useRef<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showCamera, setShowCamera] = useState(false);

  // Voices state to ensure they are loaded
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    // Initialize voices
    const updateVoices = () => {
      setVoices(window.speechSynthesis.getVoices());
    };

    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;

    // Initialize Speech Recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.onresult = (event: any) => {
        const transcript = event.results[event.resultIndex][0].transcript;
        setMessageContent(transcript);
        takeCommand(transcript.toLowerCase());
      };
      recognitionRef.current = recognition;
    }

    // Initial Interaction
    // Note: Browsers block auto-play audio without interaction. 
    // We might need a "Start" button or wait for first click.
    // But adhering to original logic which tried to run on load:
    const timer = setTimeout(() => {
      speak("Initializing NEXIS..");
      wishMe();
    }, 1000);

    return () => clearTimeout(timer);
  }, []); // Run once on mount

  const speak = (text: string) => {
    const text_speak = new SpeechSynthesisUtterance(text);

    // We'll prioritize high-quality male voices.
    // Note: voices might be empty initially if not loaded, so we fetch directly if needed
    const currentVoices = voices.length > 0 ? voices : window.speechSynthesis.getVoices();

    const desiredVoice = currentVoices.find(voice => voice.name === 'Google US English Male') ||
      currentVoices.find(voice => voice.name.includes('Male') && voice.lang.startsWith('en-')) ||
      currentVoices.find(voice => voice.lang === 'en-US');

    if (desiredVoice) {
      text_speak.voice = desiredVoice;
    }

    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak);
  };

  const wishMe = () => {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 12) speak("Good Morning Boss...");
    else if (hour >= 12 && hour < 17) speak("Good Afternoon Boss...");
    else speak("Good Evening Boss...");
  };

  const handleMicClick = () => {
    setMessageContent("Listening....");
    if (recognitionRef.current) {
      recognitionRef.current.start();
    } else {
      alert("Speech Recognition not supported or not initialized.");
    }
  };

  const handleSend = () => {
    if (inputValue.trim() !== "") {
      setMessageContent(inputValue);
      takeCommand(inputValue.toLowerCase());
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const openCamera = () => {
    setShowCamera(true);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          }
          speak("Camera is now on.");
        })
        .catch((err) => {
          console.error("Camera error: ", err);
          speak("Sorry, I can't access the camera.");
        });
    }
  };

  const takeCommand = (message: string) => {
    if (message.includes('hey') || message.includes('hello') || message.includes('hi')) {
      speak("Hello friend, How May I Help You?");
    } else if (message.includes('who are you')) {
      speak("My name is NEXIS. I'm a Virtual Assistant Created by My God Foxa whose real name is Amay.");
    } else if (message.includes('how are you')) {
      speak("I am very fine. Thank you so much for asking. I feel so grateful for helping you.");
    } else if (message.includes('what is your name')) {
      speak("My name is NEXIS.");
    } else if (message.includes('bye')) {
      speak("Bye, nice meeting you.");
    } else if (message.includes("i love you")) {
      speak("I appreciate that. I'm here to help you anytime.");
    } else if (message.includes("you are awesome") || message.includes("you're awesome")) {
      speak("Thank you! I'm glad I could be of assistance.");
    } else if (message.includes("tell me a joke")) {
      speak("Why don't scientists trust atoms? Because they make up everything!");
    } else if (message.includes("open google")) {
      window.open("https://google.com", "_blank");
      speak("Opening Google...");
    } else if (message.includes("open youtube")) {
      window.open("https://youtube.com", "_blank");
      speak("Opening YouTube...");
    } else if (message.includes("open facebook")) {
      window.open("https://facebook.com", "_blank");
      speak("Opening Facebook...");
    } else if (message.includes("open whatsapp")) {
      window.open("https://web.whatsapp.com", "_blank");
      speak("Opening WhatsApp...");
    } else if (message.startsWith("play ")) {
      const song = message.replace("play ", "").trim();
      window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(song)}`, "_blank");
      speak(`Playing ${song} on YouTube`);
    } else if (message.includes("i'm feeling sad") || message.includes("i am sad")) {
      speak("I'm sorry to hear that. I hope this music will make you feel better.");
      window.open("https://www.youtube.com/results?search_query=uplifting+music", "_blank");
    } else if (message.includes("i'm feeling happy") || message.includes("i am happy")) {
      speak("That's great to hear! Let's celebrate with some happy music.");
      window.open("https://www.youtube.com/results?search_query=happy+music", "_blank");
    } else if (message.includes("i'm feeling tired") || message.includes("i'm sleepy")) {
      speak("You should get some rest. Here are some relaxing sounds to help you sleep.");
      window.open("https://www.youtube.com/results?search_query=sleep+music", "_blank");
    } else if (message.includes("i'm feeling bored") || message.includes("i am bored")) {
      speak("I have an idea. How about we play a game?");
      window.open("https://www.google.com/search?q=online+games", "_blank");
    } else if (message.includes("i'm feeling lonely")) {
      speak("I'm here for you. Remember, you can always connect with your loved ones.");
    } else if (message.includes("i'm feeling angry")) {
      speak("Please take a deep breath. I hope these calming sounds will help you relax.");
      window.open("https://www.youtube.com/results?search_query=calming+sounds", "_blank");
    } else if (message.includes("i'm feeling excited")) {
      speak("That's fantastic! Let's listen to some energetic music to match your mood.");
      window.open("https://www.youtube.com/results?search_query=energetic+music", "_blank");
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are') || message.includes('tell me something about')) {
      window.open(`https://www.google.com/search?q=${message.replace(/ /g, "+")}`, "_blank");
      speak("This is what I found on the internet regarding " + message);
    } else if (message.includes('wikipedia')) {
      window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "").trim()}`, "_blank");
      speak("This is what I found on Wikipedia regarding " + message);
    } else if (message.includes('time')) {
      const time = new Date().toLocaleString(undefined, {
        hour: "numeric",
        minute: "numeric"
      });
      speak("The time is " + time);
    } else if (message.includes('date')) {
      const date = new Date().toLocaleString(undefined, {
        month: "short",
        day: "numeric"
      });
      speak("Today's date is " + date);
    } else if (message.includes('calculator')) {
      window.open('Calculator:///', "_blank");
      speak("Opening Calculator");
    } else if (message.includes("open camera")) {
      openCamera();
    } else {
      window.open(`https://www.google.com/search?q=${message.replace(/ /g, "+")}`, "_blank");
      speak("I found some information for " + message + " on Google.");
    }
  };

  return (
    <>
      <div className="main">
        <h1 className="main-heading">NEXIS</h1>
        <p className="tagline">I am available for you <span className="highlight">24/7</span></p>
        <p className="sub-tagline">How may I assist you?</p>

        <div className="robot-image">
          <img src="/robot.gif" alt="Robot Assistant" />
        </div>

        {showCamera && (
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <video ref={videoRef} style={{ width: '300px', borderRadius: '10px', border: '2px solid #00e5ff' }} />
          </div>
        )}

        <div className="input">
          <div className="content">{messageContent}</div>
        </div>

        <div className="mic-button-container">
          <button className="talk" title="Click to talk" onClick={handleMicClick}>
            <i className="fas fa-microphone"></i>
          </button>
        </div>

        <p className="click-hint">🎙 Click to Command</p>

        <div className="chat-section">
          <input
            type="text"
            className="chat-input-box"
            placeholder="Type your command here..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="send-button" onClick={handleSend}>Send</button>
        </div>
      </div>

      <div className="footer-section">
        <div className="footer-roles">
          <div className="role-group">
            <h3 className="role-title">Developer</h3>
            <p className="name">Name: Amay</p>
            <p className="email">Email: amay123@gmail.com</p>
          </div>
          <div className="role-group">
            <h3 className="role-title">Maintainer</h3>
            <p className="name">Name: Amay</p>
            <p className="email">Email: amay123@gmail.com</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
