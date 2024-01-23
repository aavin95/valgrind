import * as vscode from 'vscode';
import { runValgrind } from './valgrind';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('valgrind.runValgrind', async () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const filePath = editor.document.fileName;
      await runValgrind(filePath);
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
