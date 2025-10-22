document.addEventListener('DOMContentLoaded', () => {
    const commandInput = document.getElementById('command-input');
    const output = document.getElementById('output');
    const terminal = document.getElementById('terminal');
    const inputLine = document.querySelector('.input-line');

    const commandHistory = [];
    let historyIndex = -1;
    let isTyping = false;
    const typingQueue = [];

    const welcomeAscii = `
     _                               ____        _ _
    | | ___  _ __ ___   ___  _ __   / ___|  ___ | (_)_ __   __ _ _ __
 _  | |/ _ \\| '_ \` _ \\ / _ \\| '_ \\  \\___ \\ / _ \\| | | '_ \\ / _\` | '_ \\
| |_| | (_) | | | | | | (_) | | | |  ___) | (_) | | | | | | (_| | |_) |
 \\___/ \\___/|_| |_| |_|\\___/|_| |_| |____/ \\___/|_|_|_| |_|\\__,_| .__/
                                                                |_|
`;

    // Create and append the cursor element
    const cursor = document.createElement('span');
    cursor.classList.add('cursor');
    inputLine.appendChild(cursor);

    // Function to process the typing queue
    function processTypingQueue() {
        if (typingQueue.length === 0) {
            isTyping = false;
            commandInput.disabled = false;
            commandInput.focus();
            return;
        }
        isTyping = true;
        commandInput.disabled = true;
        const nextTask = typingQueue.shift();
        typewriter(nextTask.text, nextTask.element, nextTask.callback);
    }

    // Typewriter effect
    function typewriter(text, element, callback) {
        let i = 0;
        const speed = 50; // Milliseconds per character

        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
                scrollToBottom();
            } else if (callback) {
                callback();
            }
        }
        type();
    }

    // Welcome sequence
    function welcome() {
        printAsciiArt(welcomeAscii);
        printOutput('Welcome to my interactive terminal!');
        printOutput('Type `help` to see a list of available commands.');
        printOutput('');
    }

    welcome();

    commandInput.addEventListener('keydown', (e) => {
        if (isTyping) return; // Ignore input while typing

        if (e.key === 'Enter') {
            const command = commandInput.value.trim();
            if (command) {
                printCommand(command);
                handleCommand(command);
                commandHistory.push(command);
                historyIndex = commandHistory.length;
                commandInput.value = '';
                updateCursorPosition();
            }
        } else if (e.key === 'ArrowUp') {
            if (historyIndex > 0) {
                historyIndex--;
                commandInput.value = commandHistory[historyIndex];
                updateCursorPosition();
            }
        } else if (e.key === 'ArrowDown') {
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                commandInput.value = commandHistory[historyIndex];
                updateCursorPosition();
            } else {
                historyIndex = commandHistory.length;
                commandInput.value = '';
                updateCursorPosition();
            }
        }
    });

    commandInput.addEventListener('input', updateCursorPosition);

    // Keep the input focused
    terminal.addEventListener('click', () => {
        if (!isTyping) {
            commandInput.focus();
        }
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
                welcome();
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
        output.appendChild(line);
        typingQueue.push({ text: message, element: line, callback: processTypingQueue });
        if (!isTyping) {
            processTypingQueue();
        }
    }

    function printAsciiArt(art) {
        const pre = document.createElement('pre');
        pre.innerHTML = art;
        output.appendChild(pre);
        scrollToBottom();
    }

    function printError(message) {
        const line = document.createElement('div');
        line.innerHTML = `<span class="error"></span>`;
        output.appendChild(line);
        const errorSpan = line.querySelector('.error');
        typingQueue.push({ text: message, element: errorSpan, callback: processTypingQueue });
        if (!isTyping) {
            processTypingQueue();
        }
    }

    function scrollToBottom() {
        terminal.scrollTop = terminal.scrollHeight;
    }

    function updateCursorPosition() {
        const span = document.createElement('span');
        span.textContent = commandInput.value;
        document.body.appendChild(span);
        const textWidth = span.offsetWidth;
        document.body.removeChild(span);
        const promptWidth = document.querySelector('.prompt').offsetWidth;
        cursor.style.left = `${promptWidth + textWidth + 8}px`; // 8px for margin
    }

    updateCursorPosition(); // Initial position
});