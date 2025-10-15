#!/bin/bash

# A more advanced, functional script for the terminal animation.

# We use "echo -n" to avoid newlines and "sleep" to create pauses.
# ANSI escape codes are used for color.
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# --- Start of Script ---

# whoami
echo -n '$ '
sleep 1
echo "whoami"
sleep 1
echo "Jomon Solinap"
echo "A passionate developer who loves turning ideas into reality with code."
echo ""
sleep 1

# git clone
echo -n '$ '
sleep 1
echo "git clone https://github.com/jomonsolinap/my-portfolio.git"
sleep 1
echo "Cloning into 'my-portfolio'..."
sleep 1
echo "Done."
echo ""
sleep 1

# cd
echo -n '$ '
sleep 1
echo "cd my-portfolio"
sleep 1
echo ""

# ls -l
echo -n '$ '
sleep 1
echo "ls -l"
sleep 1
echo "total 12"
echo "-rw-r--r-- 1 user user 1234 Oct 15 08:17 package.json"
echo "-rw-r--r-- 1 user user 5678 Oct 15 08:17 README.md"
echo "drwxr-xr-x 2 user user 4096 Oct 15 08:17 src"
echo ""
sleep 1

# npm install
echo -n '$ '
sleep 1
echo "npm install"
sleep 1
echo "added 150 packages in 5s"
echo ""
sleep 1

# npm run build
echo -n '$ '
sleep 1
echo "npm run build"
sleep 1
echo "> my-portfolio@1.0.0 build /home/user/my-portfolio"
echo "> react-scripts build"
echo ""
echo -e "${GREEN}Build successful!${NC}"
echo ""
sleep 1

# exit
echo -n '$ '
sleep 1
echo "exit"
sleep 1