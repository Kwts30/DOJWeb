#!/bin/bash

# Build script for Los Santos DOJ Website
echo "[DOJ BUILD] Building Los Santos Department of Justice Website..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "[SETUP] Installing dependencies..."
    npm install
fi

# Build CSS with Tailwind
echo "[CSS] Building CSS with Tailwind..."
npx tailwindcss -i ./input.css -o ./style.css --minify

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "[SUCCESS] Build completed successfully!"
    echo "[INFO] You can now open index.html in your browser."
else
    echo "[ERROR] Build failed!"
    exit 1
fi
