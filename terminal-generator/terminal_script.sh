#!/bin/bash

# A more robust script for termtosvg that does not require user input.
# It simulates a user typing commands and seeing output.

# We use "echo -n" to avoid newlines and "sleep" to create pauses.
# The command prompt is manually printed.

echo -n '$ '
sleep 1
echo "whoami"
sleep 1
echo "Jomon Solinap"
echo ""
sleep 1

echo -n '$ '
sleep 1
echo "ls skills"
sleep 1
echo "Python  JavaScript  React  Node.js  SQL  Docker"
echo ""
sleep 1

echo -n '$ '
sleep 1
echo "cat contact.txt"
sleep 1
echo "Email: jomonsolinap@gmail.com"
echo ""
sleep 1

echo -n '$ '
sleep 1
echo "exit"
sleep 1