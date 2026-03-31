import { speechService } from './speechService';
import type { Command } from '../types';
import { defaultCommands } from './commandPlugins';

class CommandProcessor {
    private commands: Command[] = [];

    constructor() {
        this.registerDefaultCommands();
    }

    registerCommand(plugin: Command) {
        this.commands.push(plugin);
    }

    private registerDefaultCommands() {
        defaultCommands.forEach(p => this.registerCommand(p));
    }

    async processCommand(message: string) {
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
            // Intelligent Fallback: Check Wikipedia first
            try {
                // Try Wikipedia summary for the message
                const wikiRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(message.replace(/\s+/g, '_'))}`);
                
                if (wikiRes.ok) {
                    const data = await wikiRes.json();
                    if (data.type === 'standard' && data.extract) {
                        speechService.speak(`I found some information on ${message}: ${data.extract}`);
                        return;
                    }
                }
                
                // Final Fallback: Google Search
                window.open(`https://www.google.com/search?q=${encodeURIComponent(message)}`, "_blank");
                speechService.speak("I found some information for " + message + " on Google.");
            } catch (error) {
                console.error("Processor Fallback Error:", error);
                window.open(`https://www.google.com/search?q=${encodeURIComponent(message)}`, "_blank");
                speechService.speak("I found some information for " + message + " on Google.");
            }
        }
    }

    getAvailableCommands() {
        return this.commands;
    }
}

export const commandProcessor = new CommandProcessor();
