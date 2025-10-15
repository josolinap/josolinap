# Terminal SVG Generator

This directory contains the files used to generate the animated `terminal.svg` in the `assets` directory.

## How to Regenerate

1.  **Modify the script:** Edit `terminal_script.sh` to change the commands and output of the animation.
2.  **Install dependencies:** You will need `svg-term-cli` and `asciinema`. You can install them with:
    ```bash
    npm install -g svg-term-cli
    pip install asciinema
    ```
3.  **Run the generator:** From the root of the repository, run the following command:
    ```bash
    svg-term --command="./terminal-generator/terminal_script.sh" --out assets/terminal.svg --profile terminal-generator/dracula.itermcolors --term iterm2
    ```

This will overwrite the `terminal.svg` in the `assets` directory with your new animation.