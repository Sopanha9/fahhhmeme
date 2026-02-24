import * as vscode from "vscode";
import { spawn } from "child_process";
import * as path from "path";
import * as os from "os";

export function activate(context: vscode.ExtensionContext) {
  const playSound = () => {
    const soundPath = path.join(
      context.extensionUri.fsPath,
      "media",
      "fahh-sound.mp3",
    );
    const platform = os.platform();
    let command: string;
    let args: string[];

    if (platform === "darwin") {
      // macOS
      command = "afplay";
      args = [soundPath];
    } else if (platform === "win32") {
      // Windows — SoundPlayer only supports .wav; use MediaPlayer for .mp3
      const soundUri = "file:///" + soundPath.replace(/\\/g, "/");
      command = "powershell.exe";
      args = [
        "-NoProfile",
        "-NonInteractive",
        "-Command",
        `Add-Type -AssemblyName presentationCore; $p = New-Object System.Windows.Media.MediaPlayer; $p.Open([uri]'${soundUri}'); $p.Play(); Start-Sleep -s 4; $p.Close()`,
      ];
    } else {
      // Linux
      command = "paplay";
      args = [soundPath];
    }

    const player = spawn(command, args, { stdio: "ignore" });
    player.on("error", (error) => {
      console.error("Failed to play sound:", error.message);
    });
  };

  const selectionListener = vscode.window.onDidChangeTextEditorSelection(
    (event) => {
      const editor = event.textEditor;
      if (!editor) {
        return;
      }

      const line = editor.selection.active.line;

      const diagnostics = vscode.languages.getDiagnostics(editor.document.uri);

      const hasError = diagnostics.some(
        (d) =>
          d.severity === vscode.DiagnosticSeverity.Error &&
          d.range.start.line <= line &&
          d.range.end.line >= line,
      );

      if (hasError) {
        playSound();
        console.log("FAHHHH triggered");
      }
    },
  );

  context.subscriptions.push(selectionListener);
  vscode.window.showInformationMessage(
    "fahhSound is active. Move cursor onto an error line to play sound.",
  );
}

export function deactivate() {}
