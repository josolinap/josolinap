document.addEventListener('DOMContentLoaded', () => {
    const commandInput = document.getElementById('command-input');
    const output = document.getElementById('output');
    const terminal = document.getElementById('terminal');

    const commandHistory = [];
    let historyIndex = -1;

    // Welcome message
    printOutput('Welcome to my interactive terminal!');
    printOutput('Type `help` to see a list of available commands.');
    printOutput('');

    commandInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = commandInput.value.trim();
            if (command) {
                printCommand(command);
                handleCommand(command);
                commandHistory.push(command);
                historyIndex = commandHistory.length;
                commandInput.value = '';
            }
        } else if (e.key === 'ArrowUp') {
            if (historyIndex > 0) {
                historyIndex--;
                commandInput.value = commandHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                commandInput.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                commandInput.value = '';
            }
        }
    });

    // Keep the input focused
    terminal.addEventListener('click', () => {
        commandInput.focus();
    });

    function handleCommand(command) {
        const [cmd, ...args] = command.toLowerCase().split(' ');

        switch (cmd) {
            case 'help':
                printOutput('Available commands:');
                printOutput('&nbsp;&nbsp;help&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show this help message');
                printOutput('&nbsp;&nbsp;about&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show information about me');
                printOutput('&nbsp;&nbsp;skills&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- List my technical skills');
                printOutput('&nbsp;&nbsp;projects&nbsp;&nbsp;&nbsp;- Show my featured projects');
                printOutput('&nbsp;&nbsp;contact&nbsp;&nbsp;&nbsp;&nbsp;- Show my contact information');
                printOutput('&nbsp;&nbsp;clear&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Clear the terminal screen');
                break;
            case 'about':
                printOutput('Jomon Solinap');
                printOutput('A passionate developer who loves turning ideas into reality with code.');
                break;
            case 'skills':
                printOutput('Languages: Python, JavaScript, SQL');
                printOutput('Frameworks: React, Node.js');
                printOutput('Tools: Docker, Git, GitHub');
                break;
            case 'projects':
                printOutput('Here are a few of my projects:');
                printOutput('<a href="https://github.com/jomonsolinap/jomonsolinap" target="_blank">Interactive GitHub Profile</a> - The very terminal you are using now!');
                break;
            case 'contact':
                printOutput('You can reach me at:');
                printOutput('Email: <a href="mailto:jomonsolinap@gmail.com">jomonsolinap@gmail.com</a>');
                break;
            case 'clear':
                output.innerHTML = '';
                break;
            default:
                printError(`Command not found: ${command}`);
                break;
        }
        printOutput(''); // Add a blank line for spacing
    }

    function printCommand(command) {
        const prompt = document.createElement('div');
        prompt.innerHTML = `<span class="prompt">user@jomon.dev:~$</span> <span class="command">${command}</span>`;
        output.appendChild(prompt);
        scrollToBottom();
    }

    function printOutput(message) {
        const line = document.createElement('div');
        line.innerHTML = message;
        output.appendChild(line);
        scrollToBottom();
    }

    function printError(message) {
        const line = document.createElement('div');
        line.innerHTML = `<span class="error">${message}</span>`;
        output.appendChild(line);
        scrollToBottom();
    }

    function scrollToBottom() {
        terminal.scrollTop = terminal.scrollHeight;
    }
});