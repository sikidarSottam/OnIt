# 🌌 OnIt - The Future of Virtual Assistance

![Live Demo](https://on-it-sigma.vercel.app/)

![OnIt screenshot](file:///e:/Projects/OnIt/src/assets/Screenshot%20(60).png)

[![](https://img.shields.io/badge/license-MIT-green)](LICENSE) [![](https://img.shields.io/badge/website-live-blue)](https://on-it-sigma.vercel.app/) [![](https://img.shields.io/badge/npm-v1.0.0-blue)](https://www.npmjs.com/package/onit)

## 📖 Overview
**OnIt** is a next‑generation, immersive virtual assistant that blends cutting‑edge 3D glassmorphism visuals with intelligent voice and text interaction. It provides a premium, high‑impact UI for productivity‑focused users, offering a living interface that reacts to time of day, voice commands, and custom widgets.

---

## 📚 Table of Contents
- [🚀 Live Demo](#-live-demo)
- [✨ Key Features](#-key-features)
- [🏗️ Architecture Overview](#-architecture-overview)
- [📁 Project Structure](#-project-structure)
- [🛠️ Tech Stack](#-tech-stack)
- [⚙️ Getting Started](#-getting-started)
- [📜 Scripts & Commands](#-scripts--commands)
- [🧪 Testing](#-testing)
- [🤝 Contributing](#-contributing)
- [🙌 Acknowledgements](#-acknowledgements)
- [🛡️ License](#-license)

---

## 🚀 Live Demo
Explore the full experience at **[OnIt Live Demo](https://on-it-sigma.vercel.app/)**.

---

## ✨ Key Features
- **Intelligent Voice & Text Interaction** – Powered by the Web Speech API for seamless voice commands and typed input.
- **Immersive 3D Glassmorphism UI** – Dynamic starfield background, holographic components, and time‑aware themes.
- **Integrated Toolbox & Widgets** – Calculator, Sticky Notes, Unit Converter, and quick‑action chips (Weather, Time, Jokes).
- **Focus Mode** – Distraction‑free workspace.
- **Keyboard Shortcuts** – Full navigation without a mouse.
- **Voice History** – Staggered chat feed of past interactions.

---

## 🏗️ Architecture Overview
```mermaid
flowchart TD
    subgraph UI[User Interface]
        Navbar[Navbar]
        Canvas["3D Canvas (Three.js)"]
        WidgetDrawer[Widget Drawer]
        Chat[Chat Feed]
    end
    subgraph Services[Application Services]
        VoiceService[Voice Service]
        APIService[External API Service]
        StateStore[Global State (React Context)]
    end
    UI --> VoiceService
    UI --> APIService
    UI --> StateStore
    VoiceService --> APIService
    APIService --> StateStore
    StateStore --> UI
```
The UI interacts with **VoiceService** and **APIService**, both reading/writing the **Global State**. The 3D canvas is powered by **Three.js** via `@react-three/fiber`.

---

## 📁 Project Structure
```
src/
├─ assets/                # Static assets (images, icons, fonts)
├─ components/            # Re‑usable UI components
│   ├─ Navbar.tsx
│   ├─ WidgetDrawer.tsx
│   └─ ...
├─ services/              # Business logic & API integrations
│   ├─ voiceService.ts
│   ├─ weatherService.ts
│   └─ ...
├─ hooks/                 # Custom React hooks
│   └─ useTheme.ts
├─ store/                 # Global state (React Context / Zustand)
│   └─ index.ts
├─ styles/                # Vanilla CSS with custom properties
│   └─ globals.css
├─ App.tsx                # Root component
└─ main.tsx               # Entry point
```
Each folder follows a **single‑responsibility** principle, making the codebase easy to navigate and extend.

---

## 🛠️ Tech Stack
- **Core**: React 19, TypeScript
- **3D**: Three.js, @react-three/fiber, @react-three/drei
- **Animations**: Framer Motion
- **Styling**: Vanilla CSS with CSS Custom Properties (dark mode, glassmorphism)
- **APIs**: Web Speech API, Open‑Meteo, Wikipedia REST

---

## ⚙️ Getting Started
### Prerequisites
- Node.js ≥ 18 (LTS)
- npm ≥ 9 or Yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/sikidarSottam/OnIt.git
cd OnIt
# Install dependencies
npm install   # or `yarn`
```
### Development
```bash
npm run dev   # Starts Vite dev server at http://localhost:5173
```
Open the URL in a modern browser (Chrome ≥ 112 recommended) to experience the full UI.

---

## 📜 Scripts & Commands
| Script | Description |
|--------|-------------|
| `dev` | Launches the Vite development server |
| `build` | Produces an optimized production bundle |
| `preview` | Serves the production build locally |
| `lint` | Runs ESLint + Prettier checks |
| `test` | Executes unit & integration tests |

---

## 🧪 Testing
```bash
npm run test
```
The test suite uses **Vitest** and **React Testing Library** to cover core components and services.

---

## 🤝 Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feat/awesome-feature`).
3. Ensure linting passes (`npm run lint`).
4. Write tests for new functionality.
5. Open a Pull Request with a clear description of changes.

*Optional*: Add a **CODE_OF_CONDUCT.md** and follow the conventional commits style.

---

## 🙌 Acknowledgements
- **Three.js** – 3D rendering engine
- **@react-three/fiber** & **@react-three/drei** – React bindings for Three.js
- **Framer Motion** – Animation library
- **Web Speech API** – Voice recognition & synthesis
- **Open‑Meteo** – Weather data
- **Wikipedia REST API** – Content lookup

---

## 🛡️ License
This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

---

*Crafted with ✨ by the OnIt team.*

![Live Demo](https://on-it-sigma.vercel.app/)

![OnIt screenshot](file:///e:/Projects/OnIt/src/assets/Screenshot%20(60).png)

[![](https://img.shields.io/badge/license-MIT-green)](LICENSE) [![](https://img.shields.io/badge/website-live-blue)](https://on-it-sigma.vercel.app/) [![](https://img.shields.io/badge/npm-v1.0.0-blue)](https://www.npmjs.com/package/onit)

## 📖 Overview
**OnIt** is a next‑generation, immersive virtual assistant that blends cutting‑edge 3D glassmorphism visuals with intelligent voice and text interaction. It provides a premium, high‑impact UI for productivity‑focused users, offering a living interface that reacts to time of day, voice commands, and custom widgets.

---

## 📚 Table of Contents
- [🚀 Live Demo](#-live-demo)
- [✨ Key Features](#-key-features)
- [🏗️ Architecture Overview](#-architecture-overview)
- [📁 Project Structure](#-project-structure)
- [🛠️ Tech Stack](#-tech-stack)
- [⚙️ Getting Started](#-getting-started)
- [📜 Scripts & Commands](#-scripts--commands)
- [🧪 Testing](#-testing)
- [🤝 Contributing](#-contributing)
- [🙌 Acknowledgements](#-acknowledgements)
- [🛡️ License](#-license)

---

## 🚀 Live Demo
Explore the full experience at **[OnIt Live Demo](https://on-it-sigma.vercel.app/)**.

---

## ✨ Key Features
- **Intelligent Voice & Text Interaction** – Powered by the Web Speech API for seamless voice commands and typed input.
- **Immersive 3D Glassmorphism UI** – Dynamic starfield background, holographic components, and time‑aware themes.
- **Integrated Toolbox & Widgets** – Calculator, Sticky Notes, Unit Converter, and quick‑action chips (Weather, Time, Jokes).
- **Focus Mode** – Distraction‑free workspace.
- **Keyboard Shortcuts** – Full navigation without a mouse.
- **Voice History** – Staggered chat feed of past interactions.

---

## 🏗️ Architecture Overview
```mermaid
flowchart TD
    subgraph UI[User Interface]
        Navbar[Navbar]
        Canvas[3D Canvas (Three.js)]
        WidgetDrawer[Widget Drawer]
        Chat[Chat Feed]
    end
    subgraph Services[Application Services]
        VoiceService[Voice Service]
        APIService[External API Service]
        StateStore[Global State (React Context)]
    end
    UI --> VoiceService
    UI --> APIService
    UI --> StateStore
    VoiceService --> APIService
    APIService --> StateStore
    StateStore --> UI
```
The UI interacts with **VoiceService** and **APIService**, both reading/writing the **Global State**. The 3D canvas is powered by **Three.js** via `@react-three/fiber`.

---

## 📁 Project Structure
```
src/
├─ assets/                # Static assets (images, icons, fonts)
├─ components/            # Re‑usable UI components
│   ├─ Navbar.tsx
│   ├─ WidgetDrawer.tsx
│   └─ ...
├─ services/              # Business logic & API integrations
│   ├─ voiceService.ts
│   ├─ weatherService.ts
│   └─ ...
├─ hooks/                 # Custom React hooks
│   └─ useTheme.ts
├─ store/                 # Global state (React Context / Zustand)
│   └─ index.ts
├─ styles/                # Vanilla CSS with custom properties
│   └─ globals.css
├─ App.tsx                # Root component
└─ main.tsx               # Entry point
```
Each folder follows a **single‑responsibility** principle, making the codebase easy to navigate and extend.

---

## 🛠️ Tech Stack
- **Core**: React 19, TypeScript
- **3D**: Three.js, @react-three/fiber, @react-three/drei
- **Animations**: Framer Motion
- **Styling**: Vanilla CSS with CSS Custom Properties (dark mode, glassmorphism)
- **APIs**: Web Speech API, Open‑Meteo, Wikipedia REST

---

## ⚙️ Getting Started
### Prerequisites
- Node.js ≥ 18 (LTS)
- npm ≥ 9 or Yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/sikidarSottam/OnIt.git
cd OnIt
# Install dependencies
npm install   # or `yarn`
```
### Development
```bash
npm run dev   # Starts Vite dev server at http://localhost:5173
```
Open the URL in a modern browser (Chrome ≥ 112 recommended) to experience the full UI.

---

## 📜 Scripts & Commands
| Script | Description |
|--------|-------------|
| `dev` | Launches the Vite development server |
| `build` | Produces an optimized production bundle |
| `preview` | Serves the production build locally |
| `lint` | Runs ESLint + Prettier checks |
| `test` | Executes unit & integration tests |

---

## 🧪 Testing
```bash
npm run test
```
The test suite uses **Vitest** and **React Testing Library** to cover core components and services.

---

## 🤝 Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feat/awesome-feature`).
3. Ensure linting passes (`npm run lint`).
4. Write tests for new functionality.
5. Open a Pull Request with a clear description of changes.

*Optional*: Add a **CODE_OF_CONDUCT.md** and follow the conventional commits style.

---

## 🙌 Acknowledgements
- **Three.js** – 3D rendering engine
- **@react-three/fiber** & **@react-three/drei** – React bindings for Three.js
- **Framer Motion** – Animation library
- **Web Speech API** – Voice recognition & synthesis
- **Open‑Meteo** – Weather data
- **Wikipedia REST API** – Content lookup

---

## 🛡️ License
This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

---

*Crafted with ✨ by the OnIt team.*

Live Demo: https://on-it-sigma.vercel.app/

## 📚 Table of Contents
- [✨ Key Features](#-key-features)
- [🏗️ Architecture Overview](#-architecture-overview)
- [📁 Project Structure](#-project-structure)
- [🛠️ Tech Stack](#-tech-stack)
- [🚀 Getting Started](#-getting-started)
- [📜 Scripts & Commands](#-scripts--commands)
- [🧪 Testing](#-testing)
- [🤝 Contributing](#-contributing)
- [🛡️ License](#-license)

---

## ✨ Key Features
### 🎙️ Intelligent Voice & Text Interaction
Interact seamlessly using your voice or keyboard. Powered by the Web Speech API, OnIt listens, understands, and speaks back to you with personality.

### 🔮 Immersive 3D Glassmorphism UI
- **Dynamic Starfield** – Reactive 3D background built with Three.js.
- **Holographic Aesthetics** – Glass‑morphism components with subtle shimmer effects.
- **Time‑Aware Themes** – Automatic theme shifts based on the time of day.

### 🛠️ Integrated Toolbox & Widgets
- **Calculator** – Quick computations.
- **Sticky Notes** – Persistent note‑taking.
- **Unit Converter** – Seamless unit transformations.

### ⚡ Power Features
- **Focus Mode** – Distraction‑free workspace.
- **Keyboard Shortcuts** – Full navigation without a mouse.
- **Voice History** – Review past interactions in a staggered chat feed.
- **Quick Action Chips** – One‑tap access to Weather, Time, Jokes, etc.

---

## 🏗️ Architecture Overview
```mermaid
flowchart TD
    subgraph UI[User Interface]
        Navbar[Navbar]
        Canvas[3D Canvas (Three.js)]
        WidgetDrawer[Widget Drawer]
        Chat[Chat Feed]
    end
    subgraph Services[Application Services]
        VoiceService[Voice Service]
        APIService[External API Service]
        StateStore[Global State (React Context)]
    end
    UI --> VoiceService
    UI --> APIService
    UI --> StateStore
    VoiceService --> APIService
    APIService --> StateStore
    StateStore --> UI
```
The diagram visualises the high‑level flow: UI components interact with the **VoiceService** and **APIService**, both reading/writing the **Global State**. The 3D canvas is powered by **Three.js** via `@react-three/fiber`.

---

## 📁 Project Structure
```
src/
├─ assets/                # Static assets (images, icons, fonts)
├─ components/            # Re‑usable UI components
│   ├─ Navbar.tsx
│   ├─ WidgetDrawer.tsx
│   └─ ...
├─ services/              # Business logic & API integrations
│   ├─ voiceService.ts
│   ├─ weatherService.ts
│   └─ ...
├─ hooks/                 # Custom React hooks
│   └─ useTheme.ts
├─ store/                 # Global state (React Context / Zustand)
│   └─ index.ts
├─ styles/                # Vanilla CSS with custom properties
│   └─ globals.css
├─ App.tsx                # Root component
└─ main.tsx               # Entry point
```
Each folder follows a **single‑responsibility** principle, making the codebase easy to navigate and extend.

---

## 🛠️ Tech Stack
- **Core**: React 19, TypeScript
- **3D**: Three.js, @react-three/fiber, @react-three/drei
- **Animations**: Framer Motion
- **Styling**: Vanilla CSS with CSS Custom Properties (dark mode, glassmorphism)
- **APIs**: Web Speech API, Open‑Meteo, Wikipedia REST

---

## 🚀 Getting Started
### Prerequisites
- Node.js ≥ 18 (LTS)
- npm ≥ 9 or Yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/onit.git
cd onit
# Install dependencies
npm install   # or `yarn`
```
### Development
```bash
npm run dev   # Starts Vite dev server at http://localhost:5173
```
Open the URL in a modern browser (Chrome ≥ 112 recommended) to experience the full 3D UI.

---

## 📜 Scripts & Commands
| Script | Description |
|--------|-------------|
| `dev` | Launches the Vite development server |
| `build` | Produces an optimized production bundle |
| `preview` | Serves the production build locally |
| `lint` | Runs ESLint + Prettier checks |
| `test` | Executes unit & integration tests |

---

## 🧪 Testing
```bash
npm run test
```
The test suite uses **Vitest** and **React Testing Library** to cover core components and services.

---

## 🤝 Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feat/awesome-feature`).
3. Ensure linting passes (`npm run lint`).
4. Write tests for new functionality.
5. Open a Pull Request with a clear description of changes.

---

## 🛡️ License
This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

---

*Crafted with ✨ by the OnIt team.*


---

## ✨ Key Features
### 🎙️ Intelligent Voice & Text Interaction
Interact seamlessly using your voice or keyboard. Powered by the Web Speech API, OnIt listens, understands, and speaks back to you with personality.

### 🔮 Immersive 3D Glassmorphism UI
- **Dynamic Starfield** – Reactive 3D background built with Three.js.
- **Holographic Aesthetics** – Glass‑morphism components with subtle shimmer effects.
- **Time‑Aware Themes** – Automatic theme shifts based on the time of day.

### 🛠️ Integrated Toolbox & Widgets
- **Calculator** – Quick computations.
- **Sticky Notes** – Persistent note‑taking.
- **Unit Converter** – Seamless unit transformations.

### ⚡ Power Features
- **Focus Mode** – Distraction‑free workspace.
- **Keyboard Shortcuts** – Full navigation without a mouse.
- **Voice History** – Review past interactions in a staggered chat feed.
- **Quick Action Chips** – One‑tap access to Weather, Time, Jokes, etc.

---

## 🏗️ Architecture Overview
```mermaid
flowchart TD
    subgraph UI[User Interface]
        Navbar[Navbar]
        Canvas[3D Canvas (Three.js)]
        WidgetDrawer[Widget Drawer]
        Chat[Chat Feed]
    end
    subgraph Services[Application Services]
        VoiceService[Voice Service]
        APIService[External API Service]
        StateStore[Global State (React Context)]
    end
    UI --> VoiceService
    UI --> APIService
    UI --> StateStore
    VoiceService --> APIService
    APIService --> StateStore
    StateStore --> UI
```
The diagram visualises the high‑level flow: UI components interact with the **VoiceService** and **APIService**, both of which read/write the **Global State**. The 3D canvas is powered by **Three.js** via `@react-three/fiber`.

---

## 📁 Project Structure
```
src/
├─ assets/                # Static assets (images, icons, fonts)
├─ components/            # Re‑usable UI components
│   ├─ Navbar.tsx
│   ├─ WidgetDrawer.tsx
│   └─ ...
├─ services/              # Business logic & API integrations
│   ├─ voiceService.ts
│   ├─ weatherService.ts
│   └─ ...
├─ hooks/                 # Custom React hooks
│   └─ useTheme.ts
├─ store/                 # Global state (React Context / Zustand)
│   └─ index.ts
├─ styles/                # Vanilla CSS with custom properties
│   └─ globals.css
├─ App.tsx                # Root component
└─ main.tsx               # Entry point
```
Each folder follows a **single‑responsibility** principle, making the codebase easy to navigate and extend.

---

## 🛠️ Tech Stack
- **Core**: React 19, TypeScript
- **3D**: Three.js, @react-three/fiber, @react-three/drei
- **Animations**: Framer Motion
- **Styling**: Vanilla CSS with CSS Custom Properties (dark mode, glassmorphism)
- **APIs**: Web Speech API, Open‑Meteo, Wikipedia REST

---

## 🚀 Getting Started
### Prerequisites
- Node.js ≥ 18 (LTS)
- npm ≥ 9 or Yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/onit.git
cd onit

# Install dependencies
npm install   # or `yarn`
```
### Development
```bash
npm run dev   # Starts Vite dev server at http://localhost:5173
```
Open the URL in a modern browser (Chrome ≥ 112 recommended) to experience the full 3D UI.

---

## 📜 Scripts & Commands
| Script | Description |
|--------|-------------|
| `dev` | Launches the Vite development server |
| `build` | Produces an optimized production bundle |
| `preview` | Serves the production build locally |
| `lint` | Runs ESLint + Prettier checks |
| `test` | Executes unit & integration tests |

---

## 🧪 Testing
```bash
npm run test
```
The test suite uses **Vitest** and **React Testing Library** to cover core components and services.

---

## 🤝 Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feat/awesome-feature`).
3. Ensure linting passes (`npm run lint`).
4. Write tests for new functionality.
5. Open a Pull Request with a clear description of changes.

---

## 🛡️ License
This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

---

*Crafted with ✨ by the OnIt team.*

Live Demo: https://on-it-sigma.vercel.app/

**OnIt** is a next-generation, immersive virtual assistant designed to elevate your productivity with a premium, high-impact aesthetic. Marrying cutting-edge 3D visuals with intuitive voice and text interaction, OnIt isn't just a tool—it's a living interface.

---

## ✨ Key Features

### 🎙️ Intelligent Voice & Text Interaction
Interact seamlessly using your voice or keyboard. Powered by the Web Speech API, OnIt listens, understands, and speaks back to you with personality.

### 🔮 Immersive 3D Glassmorphism UI
Experience a dashboard like no other.
- **Dynamic Starfield**: A reactive 3D background built with Three.js.
- **Holographic Aesthetics**: Sleek glassmorphism components with shimmer effects and CSS-driven lighting.
- **Time-Aware Themes**: The assistant's aura and theme automatically shift based on the time of day (Morning, Afternoon, Evening, Night).

### 🛠️ Integrated Toolbox & Widgets
A dedicated **Widget Drawer** gives you quick access to essential tools:
- **Calculator**: Quick computation at your fingertips.
- **Sticky Notes**: Never lose a thought.
- **Unit Converter**: Seamless transitions between measurements.

### ⚡ Power Features
- **Focus Mode**: Minimize distractions and focus on the assistant.
- **Keyboard Shortcuts**: Navigate the entire app without a mouse.
- **Voice History**: Review past interactions in a beautiful, staggered chat feed.
- **Quick Action Chips**: One-tap access to common commands like Weather, Time, and Jokes.

---

## 🚀 Tech Stack

- **Core**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Visuals**: [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/), [@react-three/drei](https://docs.pmnd.rs/drei/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Styling**: Vanilla CSS (Modern Custom Properties, Glassmorphism, Responsive Grid)
- **APIs**: Web Speech API (Recognition & Synthesis), Open-Meteo, Wikipedia REST API

---

## 📖 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/onit.git
   ```
2. Navigate to the project directory:
   ```bash
   cd onit
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

---

## 💡 How to Use
- **Start**: Click the "Start Assistant" button or press `Enter` to wake up OnIt.
- **Speak**: Click the Microphone icon or press `Ctrl+M` to start voice recognition.
- **Type**: Simply type your command in the input field and press `Enter`.
- **Toggle Toolbox**: Press `Ctrl+T` or click the toolbox icon in the navbar.
- **Focus Mode**: Press `Ctrl+F` to hide distractions.
- **Help**: Type "help" or "?" to see all available commands and shortcuts.

---

## 🛡️ License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
