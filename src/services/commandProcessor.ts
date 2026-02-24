import { speechService } from './speechService';

export interface CommandPlugin {
    name: string;
    keywords: string[];
    action: (args: string) => void;
    description: string;
}

class CommandProcessor {
    private commands: CommandPlugin[] = [];

    constructor() {
        this.registerDefaultCommands();
    }

    registerCommand(plugin: CommandPlugin) {
        this.commands.push(plugin);
    }

    private registerDefaultCommands() {
        const defaultPlugins: CommandPlugin[] = [
            {
                name: 'Greeting',
                keywords: ['hey', 'hello', 'hi'],
                action: () => speechService.speak("Hello friend, How May I Help You?"),
                description: 'Greets the user.'
            },
            {
                name: 'Identity',
                keywords: ['who are you'],
                action: () => speechService.speak("My name is OnIt. I'm a Virtual Assistant Created by Foxa, whose real name is Amay."),
                description: 'Explains who the assistant is.'
            },
            {
                name: 'Status',
                keywords: ['how are you'],
                action: () => speechService.speak("I am very fine. Thank you so much for asking. I feel so grateful for helping you."),
                description: 'Responds to status inquiry.'
            },
            {
                name: 'Name',
                keywords: ['what is your name'],
                action: () => speechService.speak("My name is OnIt."),
                description: 'Tells the assistant name.'
            },
            {
                name: 'Farewell',
                keywords: ['bye'],
                action: () => speechService.speak("Bye, nice meeting you."),
                description: 'Says goodbye.'
            },
            {
                name: 'Affection',
                keywords: ['i love you'],
                action: () => speechService.speak("I appreciate that. I'm here to help you anytime."),
                description: 'Responds to "I love you".'
            },
            {
                name: 'Compliment',
                keywords: ['you are awesome', "you're awesome"],
                action: () => speechService.speak("Thank you! I'm glad I could be of assistance."),
                description: 'Responds to compliments.'
            },
            {
                name: 'Joke',
                keywords: ['tell me a joke'],
                action: () => speechService.speak("Why don't scientists trust atoms? Because they make up everything!"),
                description: 'Tells a joke.'
            },
            {
                name: 'Open Google',
                keywords: ['open google'],
                action: () => {
                    window.open("https://google.com", "_blank");
                    speechService.speak("Opening Google...");
                },
                description: 'Opens Google in a new tab.'
            },
            {
                name: 'Open YouTube',
                keywords: ['open youtube'],
                action: () => {
                    window.open("https://youtube.com", "_blank");
                    speechService.speak("Opening YouTube...");
                },
                description: 'Opens YouTube.'
            },
            {
                name: 'Open Facebook',
                keywords: ['open facebook'],
                action: () => {
                    window.open("https://facebook.com", "_blank");
                    speechService.speak("Opening Facebook...");
                },
                description: 'Opens Facebook.'
            },
            {
                name: 'Open WhatsApp',
                keywords: ['open whatsapp'],
                action: () => {
                    window.open("https://web.whatsapp.com", "_blank");
                    speechService.speak("Opening WhatsApp...");
                },
                description: 'Opens WhatsApp Web.'
            },
            {
                name: 'Play Song',
                // Note: action receives the already-lowercased message
                keywords: ['play '],
                action: (message) => {
                    const song = message.replace(/^play\s+/i, '').trim();
                    if (!song) {
                        speechService.speak("What would you like me to play?");
                        return;
                    }
                    window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(song)}`, "_blank");
                    speechService.speak(`Playing ${song} on YouTube`);
                },
                description: 'Plays a song on YouTube.'
            },
            {
                // More specific mood keywords to avoid false matches
                name: 'Mood: Sad',
                keywords: ['i am sad', "i'm feeling sad", "i'm sad", 'feeling sad'],
                action: () => {
                    speechService.speak("I'm sorry to hear that. I hope this music will make you feel better.");
                    window.open("https://www.youtube.com/results?search_query=uplifting+music", "_blank");
                },
                description: 'Plays uplifting music when sad.'
            },
            {
                name: 'Mood: Happy',
                keywords: ['i am happy', "i'm feeling happy", "i'm happy", 'feeling happy'],
                action: () => {
                    speechService.speak("That's great to hear! Let's celebrate with some happy music.");
                    window.open("https://www.youtube.com/results?search_query=happy+music", "_blank");
                },
                description: 'Plays happy music when happy.'
            },
            {
                name: 'Mood: Tired',
                keywords: ["i'm feeling tired", "i'm sleepy", 'i am tired', 'feeling tired'],
                action: () => {
                    speechService.speak("You should get some rest. Here are some relaxing sounds to help you sleep.");
                    window.open("https://www.youtube.com/results?search_query=sleep+music", "_blank");
                },
                description: 'Plays sleep music when tired.'
            },
            {
                name: 'Mood: Bored',
                keywords: ["i'm feeling bored", 'i am bored', 'feeling bored'],
                action: () => {
                    speechService.speak("I have an idea. How about we play a game?");
                    window.open("https://www.google.com/search?q=online+games", "_blank");
                },
                description: 'Suggests games when bored.'
            },
            {
                name: 'Mood: Lonely',
                keywords: ["i'm feeling lonely", 'i am lonely', 'feeling lonely'],
                action: () => {
                    speechService.speak("I'm here for you. Remember, you can always connect with your loved ones.");
                },
                description: 'Comforts when lonely.'
            },
            {
                name: 'Mood: Angry',
                keywords: ["i'm feeling angry", 'i am angry', 'feeling angry'],
                action: () => {
                    speechService.speak("Please take a deep breath. I hope these calming sounds will help you relax.");
                    window.open("https://www.youtube.com/results?search_query=calming+sounds", "_blank");
                },
                description: 'Plays calming sounds when angry.'
            },
            {
                name: 'Mood: Excited',
                keywords: ["i'm feeling excited", 'i am excited', 'feeling excited'],
                action: () => {
                    speechService.speak("That's fantastic! Let's listen to some energetic music to match your mood.");
                    window.open("https://www.youtube.com/results?search_query=energetic+music", "_blank");
                },
                description: 'Plays energetic music when excited.'
            },
            {
                name: 'Wikipedia',
                keywords: ['wikipedia'],
                action: (message) => {
                    const query = message.replace(/wikipedia/i, '').trim();
                    window.open(`https://en.wikipedia.org/wiki/${encodeURIComponent(query)}`, "_blank");
                    speechService.speak("This is what I found on Wikipedia regarding " + query);
                },
                description: 'Searches Wikipedia.'
            },
            {
                name: 'Time',
                keywords: ['what time', 'current time', 'tell me the time'],
                action: () => {
                    const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
                    speechService.speak("The time is " + time);
                },
                description: 'Tells the current time.'
            },
            {
                name: 'Date',
                keywords: ['what date', 'current date', "today's date", 'what is today'],
                action: () => {
                    const date = new Date().toLocaleString(undefined, { month: "long", day: "numeric", year: "numeric" });
                    speechService.speak("Today's date is " + date);
                },
                description: "Tells today's date."
            },
            {
                name: 'Help',
                keywords: ['help', 'what can you do', 'commands', 'command list'],
                action: () => {
                    const commandList = this.commands.map(c => c.name).join(", ");
                    speechService.speak("I can help you with many things. Some commands I understand: " + commandList);
                },
                description: 'Lists all available commands.'
            },
            {
                name: 'Calculator',
                keywords: ['open calculator', 'calculator'],
                action: () => {
                    window.open('Calculator:///', "_blank");
                    speechService.speak("Opening Calculator");
                },
                description: 'Opens the system calculator.'
            },
            {
                name: 'Search',
                // This should be near the end since 'what is', 'who is' etc. are broad
                keywords: ['what is', 'who is', 'what are', 'tell me about'],
                action: (message) => {
                    window.open(`https://www.google.com/search?q=${encodeURIComponent(message)}`, "_blank");
                    speechService.speak("This is what I found on the internet regarding " + message);
                },
                description: 'Searches Google for information.'
            },
        ];

        defaultPlugins.forEach(p => this.registerCommand(p));
    }

    processCommand(message: string) {
        // Normalize to lowercase for matching, but keep original for display/action
        const lowercaseMsg = message.toLowerCase().trim();

        // Find first matching plugin
        const matchedPlugin = this.commands.find(plugin =>
            plugin.keywords.some(keyword => lowercaseMsg.includes(keyword.toLowerCase()))
        );

        if (matchedPlugin) {
            // Pass the lowercased message to actions so they don't need to re-lowercase
            matchedPlugin.action(lowercaseMsg);
        } else {
            // Default: Google Search
            window.open(`https://www.google.com/search?q=${encodeURIComponent(message)}`, "_blank");
            speechService.speak("I found some information for " + message + " on Google.");
        }
    }

    getAvailableCommands() {
        return this.commands;
    }
}

export const commandProcessor = new CommandProcessor();
