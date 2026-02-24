# fahhSound

A fun VS Code extension that plays the iconic "FAHHHH" sound whenever you position your cursor on a line with a TypeScript/JavaScript error.

## Features

- 🔊 Automatically plays the "FAHHHH" sound when cursor moves onto an error line
- 🎯 Works with any language that VS Code can lint/type-check
- 🚀 Lightweight and non-intrusive
- 💻 Supports macOS, Linux, and Windows (with appropriate audio player installed)

## How to Use

1. Install the extension in VS Code
2. Open a TypeScript or JavaScript file with errors
3. Move your cursor onto a line with an error—the sound plays automatically!

## Requirements

- macOS: `afplay` (built-in)
- Linux: `paplay` (PulseAudio) or `ffplay` (FFmpeg)
- Windows: WSL or similar with audio support

## Known Issues

- Currently detects only Error-level diagnostics (not warnings)
- Cross-platform audio support is best-effort

## Release Notes

### 0.0.1

Initial release of fahhSound extension.
