import * as vscode from 'vscode';
import { exec } from 'child_process';

export function runValgrind(filePath: string) {
  // Extract directory path and filename from the provided filePath
  const dirPath = filePath.substring(0, filePath.lastIndexOf("/"));
  const fileName = filePath.substring(filePath.lastIndexOf("/") + 1);

  // Docker command with added options for handling file permissions
  const dockerCommand = `docker run --rm -v "${dirPath}:/usr/src/app" --user "$(id -u):$(id -g)" valgrind-extension valgrind --leak-check=full --show-leak-kinds=all /usr/src/app/${fileName}`;

  exec(dockerCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Execution error: ${error}`);
      return vscode.window.showErrorMessage(`Error: ${error.message}`);
    }
    if (stderr) {
      console.error(`Error: ${stderr}`);
      return vscode.window.showErrorMessage(`Error: ${stderr}`);
    }
    vscode.window.showInformationMessage(stdout);
  });
}



export function showValgrindOutputPanel(output: string) {
  const panel = vscode.window.createWebviewPanel(
    'valgrindOutput',
    'Valgrind Output',
    vscode.ViewColumn.One,
    {}
  );

  panel.webview.html = createOutputHtml(output);
}

function createOutputHtml(output: string) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Valgrind Output</title>
    </head>
    <body>
        <h1>Valgrind Output</h1>
        <pre>${sanitizeHtml(output)}</pre>
    </body>
    </html>`;
}

function sanitizeHtml(content: string): string {
  return content.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
