// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
declare var window: any;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	try {
		if (process.env.CHE_WORKSPACE_NAME) {
			vscode.window.showInformationMessage('VS Code Che has been activated successfully');
			window.parent.postMessage('hide-navbar');
		} else {
			vscode.window.showWarningMessage("This extension should work with Eclipse Che only");
		}
	} catch (error) {
		console.error('Failed to get environment variable', error);
	}

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vs-code-che" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('vs-code-che.showWorkspaceName', () => {
		try {
			if (process.env.CHE_WORKSPACE_NAME) {
				const workspaceName = process.env.CHE_WORKSPACE_NAME;
				vscode.window.showInformationMessage(workspaceName);
			} else {
				vscode.window.showWarningMessage("This extension should work with Eclipse Che only");
			}
		} catch (error) {
			console.error('Failed to get environment variable', error);
		}
	});

	context.subscriptions.push(disposable);

	let showNav = vscode.commands.registerCommand('vs-code-che.showNav', () => {
		try {
			if (window) {
				window.parent.postMessage('show-navbar');
				vscode.window.showInformationMessage('Showing che navbar');
			} else {
				vscode.window.showErrorMessage('This extension is not for VS Code on Desktop');
			}
		} catch (error) {
			console.error('Failed to get parent of the current window', error);
		}
	});

	context.subscriptions.push(showNav);

	let hideNav = vscode.commands.registerCommand('vs-code-che.hideNav', () => {
		try {
			if (window) {
				window.parent.postMessage('hide-navbar');
				vscode.window.showInformationMessage('Hiding che navbar');
			} else {
				vscode.window.showErrorMessage('This extension is not for VS Code on Desktop');
			}
		} catch (error) {
			console.error('Failed to get parent of the current window', error);
		}
	});

	context.subscriptions.push(hideNav);
}

// this method is called when your extension is deactivated
export function deactivate() {}
