import * as vscode from 'vscode';
import * as path from 'path';
const player = require('node-wav-player');

export function activate(context: vscode.ExtensionContext) {

    console.log("🐱 Meow Error Extension Activated");

    let lastPlayed = 0;

    const playMeow = async () => {

        console.log("MEOW FUNCTION CALLED");

        const now = Date.now();

        // Prevent spam (2 sec cooldown)
        if (now - lastPlayed < 2000) {
            return;
        }

        lastPlayed = now;

        const soundPath = path.join(context.extensionPath, 'media', 'meow.wav');

        try {
            await player.play({
                path: soundPath,
            });
        } catch (error) {
            console.log("Sound Error:", error);
        }
    };

    // Detect code errors (red squiggly)
    vscode.languages.onDidChangeDiagnostics(() => {

        const diagnostics = vscode.languages.getDiagnostics();

        diagnostics.forEach(([uri, errors]) => {
            if (errors.length > 0) {
                playMeow();
            }
        });
    });
}

export function deactivate() {}