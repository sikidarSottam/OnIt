import { speechService } from './speechService';
import type { Command } from '../types';

export const defaultCommands: Command[] = [
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
        keywords: ['tell me a joke', 'tell a joke', 'joke'],
        action: async () => {
            try {
                // Fetch random joke
                const res = await fetch("https://official-joke-api.appspot.com/random_joke");
                const data = await res.json();
                
                if (data.setup && data.punchline) {
                    speechService.speak(data.setup);
                    
                    // Wait for the setup to finish then deliver the punchline
                    setTimeout(() => {
                        speechService.speak(data.punchline);
                    }, 3000); // 3-second delay for best delivery
                } else {
                    speechService.speak("Why don't scientists trust atoms? Because they make up everything!");
                }
            } catch (error) {
                console.error("Joke API Error:", error);
                speechService.speak("Why don't scientists trust atoms? Because they make up everything!");
            }
        },
        description: 'Tells a random joke fetched from the internet.'
    },
    {
        name: 'Advice',
        keywords: ['give me some advice', 'advice', 'tell me something wise', 'give me advice'],
        action: async () => {
            try {
                // Fetch random advice
                const res = await fetch("https://api.adviceslip.com/advice");
                const data = await res.json();
                if (data.slip && data.slip.advice) {
                    speechService.speak("Here is a bit of advice: " + data.slip.advice);
                } else {
                    speechService.speak("I don't have any advice right now, but I'm here for you!");
                }
            } catch (error) {
                console.error("Advice API Error:", error);
                speechService.speak("I'm sorry, I couldn't reach the advice service right now.");
            }
        },
        description: 'Shares a random piece of advice or wisdom.'
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
        keywords: ['play '],
        action: (arg?: any) => {
            const message = typeof arg === 'string' ? arg : '';
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
        action: (arg?: any) => {
            const message = typeof arg === 'string' ? arg : '';
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
            speechService.speak("I can help you with many things like playing music, opening websites, or checking the time. Just ask me what you need!");
        },
        description: 'Briefly explains what the assistant can do.'
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
        name: 'Weather',
        keywords: ['weather in', 'weather of', 'weather for', 'current weather', 'whats the weather', 'what is the weather', 'weather'],
        action: async (arg?: any) => {
            const message = typeof arg === 'string' ? arg : '';
            // Extract location: look for "weather" and take what follows, stripping common connectors
            const match = message.match(/weather\s+(?:in|of|at|for|like in)?\s*(.+)/i);
            let location = match ? match[1].trim() : "";
            
            // If the message is just "weather" or empty, location remains empty
            if (message.trim().toLowerCase() === "weather") location = "";

            try {
                if (location) {
                    speechService.speak(`Checking the detailed weather for ${location}...`);
                } else {
                    speechService.speak("Fetching comprehensive local weather...");
                }

                // Use wttr.in for all requests - it's more robust and handles city names directly
                const url = location 
                    ? `https://wttr.in/${encodeURIComponent(location)}?format=j1`
                    : `https://wttr.in/?format=j1`;
                
                const res = await fetch(url);
                if (!res.ok) throw new Error(`Weather service responded with ${res.status}`);
                
                const data = await res.json();
                const current = data?.current_condition?.[0];
                const area = data?.nearest_area?.[0];

                if (!current || !area) {
                    throw new Error("Invalid weather data structure");
                }

                const cityName = area.areaName?.[0]?.value || location || "your current area";
                const countryName = area.country?.[0]?.value || "";
                const condition = current.weatherDesc?.[0]?.value || "unspecified conditions";
                const temp = current.temp_C || "unknown";
                const feelsLike = current.FeelsLikeC || "unknown";
                const humidity = current.humidity || "unknown";
                const windSpeed = current.windspeedKmph || "unknown";
                const uvIndex = current.uvIndex || "unknown";

                const locationTag = countryName ? `${cityName}, ${countryName}` : cityName;

                speechService.speak(
                    `In ${locationTag}, it's ${condition}. ` +
                    `The temperature is ${temp} degrees Celsius, but it feels like ${feelsLike} degrees. ` +
                    `Humidity is at ${humidity} percent, with a wind speed of ${windSpeed} kilometers per hour. ` +
                    `The UV index is currently ${uvIndex}.`
                );
            } catch (error) {
                console.error("Weather Service Error:", error);
                speechService.speak("I'm sorry, I couldn't fetch the full weather details at this moment. Please try again later.");
            }
        },
        description: 'Gets comprehensive weather details (temp, humidity, feels-like, uv index).'
    },
    {
        name: 'Search',
        keywords: ['what is', 'who is', 'what are', 'tell me about', 'lookup', 'search for'],
        action: async (arg?: any) => {
            const message = typeof arg === 'string' ? arg : '';
            const query = message.replace(/(?:what is|who is|what are|tell me about|lookup|search for)\s+/i, '').trim();

            if (!query) {
                speechService.speak("What would you like me to look up?");
                return;
            }

            try {
                speechService.speak(`Looking up ${query}...`);

                // 1. Try Wikipedia Summary API
                const wikiRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query.replace(/\s+/g, '_'))}`);
                
                if (wikiRes.ok) {
                    const data = await wikiRes.json();
                    if (data.type === 'standard' && data.extract) {
                        speechService.speak(`According to Wikipedia: ${data.extract}`);
                        // Optionally open the page in background for users to read more
                        // window.open(data.content_urls.desktop.page, "_blank");
                        return;
                    }
                }
                
                // 2. If Wikipedia fails, Fallback to Google Search
                window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
                speechService.speak(`I couldn't find a direct Wikipedia article for ${query}, so I've opened a Google search for you.`);
                
            } catch (error) {
                console.error("Search API Error:", error);
                window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
                speechService.speak(`I've opened a Google search for ${query}.`);
            }
        },
        description: 'Searches Wikipedia for summaries or falls back to Google.'
    },
];
