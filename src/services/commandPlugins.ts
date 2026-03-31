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
            if (message.trim() === "weather") location = "";

            try {
                if (location) {
                    speechService.speak(`Checking the deep weather for ${location}...`);

                    // Use Open-Meteo for specific city searches with more parameters
                    const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1&language=en&format=json`);
                    const geoData = await geoRes.json();

                    if (!geoData.results || geoData.results.length === 0) {
                        speechService.speak(`Sorry, I couldn't find the location ${location}.`);
                        return;
                    }

                    const { latitude, longitude, name, country } = geoData.results[0];
                    const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=uv_index_max&timezone=auto`);
                    const weatherData = await weatherRes.json();

                    const current = weatherData.current;
                    if (!current) throw new Error("No weather data returned");
                    
                    const condition = getWeatherDescription(current.weather_code);
                    const uvIndexMax = weatherData.daily?.uv_index_max?.[0] || 'low';
                    
                    speechService.speak(
                        `Currently in ${name}, ${country}, it's ${condition}. ` +
                        `The temperature is ${Math.round(current.temperature_2m)} degrees Celsius, but it feels like ${Math.round(current.apparent_temperature)} degrees. ` +
                        `Humidity is at ${current.relative_humidity_2m} percent, with a wind speed of ${Math.round(current.wind_speed_10m)} kilometers per hour. ` +
                        `The UV index for today will reach a maximum of ${uvIndexMax}.`
                    );
                } else {
                    // Use wttr.in for automatic location detection based on IP with all params
                    speechService.speak("Fetching comprehensive local weather...");
                    const res = await fetch(`https://wttr.in/?format=j1`);
                    const data = await res.json();
                    
                    if (!data.current_condition || !data.nearest_area) {
                        throw new Error("Invalid weather data");
                    }

                    const city = data.nearest_area[0]?.areaName?.[0]?.value || "your current area";
                    const current = data.current_condition[0];
                    const desc = current.weatherDesc?.[0]?.value || "unspecified conditions";
                    const uv = current.uvIndex || "unknown";

                    speechService.speak(
                        `In ${city}, it's ${desc}. ` +
                        `Temperature is ${current.temp_C} degrees Celsius, feeling like ${current.FeelsLikeC} degrees. ` +
                        `Humidity is ${current.humidity} percent, and wind speed is ${current.windspeedKmph} kilometers per hour. ` +
                        `The UV index is currently ${uv}.`
                    );
                }
            } catch (error) {
                console.error("Weather Service Error:", error);
                speechService.speak("I'm sorry, I couldn't fetch the full weather details at this moment.");
            }
        },
        description: 'Gets comprehensive weather details (temp, humidity, feels-like, uv index).'
    },
    {
        name: 'Search',
        keywords: ['what is', 'who is', 'what are', 'tell me about'],
        action: (arg?: any) => {
            const message = typeof arg === 'string' ? arg : '';
            window.open(`https://www.google.com/search?q=${encodeURIComponent(message)}`, "_blank");
            speechService.speak("This is what I found on the internet regarding " + message);
        },
        description: 'Searches Google for information.'
    },
];

/**
 * Interprets WMO Weather interpretation codes (WW)
 * https://open-meteo.com/en/docs
 */
function getWeatherDescription(code: number): string {
    const descriptions: Record<number, string> = {
        0: 'clear skies',
        1: 'mainly clear skies',
        2: 'partly cloudy',
        3: 'overcast',
        45: 'foggy',
        48: 'depositing rime fog',
        51: 'light drizzle',
        53: 'moderate drizzle',
        55: 'dense drizzle',
        56: 'light freezing drizzle',
        57: 'dense freezing drizzle',
        61: 'slight rain',
        63: 'moderate rain',
        65: 'heavy rain',
        66: 'light freezing rain',
        67: 'heavy freezing rain',
        71: 'slight snow fall',
        73: 'moderate snow fall',
        75: 'heavy snow fall',
        77: 'snow grains',
        80: 'slight rain showers',
        81: 'moderate rain showers',
        82: 'violent rain showers',
        85: 'slight snow showers',
        86: 'heavy snow showers',
        95: 'a slight thunderstorm',
        96: 'a thunderstorm with slight hail',
        99: 'a thunderstorm with heavy hail',
    };
    return descriptions[code] || 'unspecified weather conditions';
}
