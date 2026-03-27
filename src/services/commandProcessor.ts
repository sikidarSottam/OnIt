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
