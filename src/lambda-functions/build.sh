#!/bin/bash
set -e

LAMBDA_DIR=$1

if [ -z "$LAMBDA_DIR" ]; then
    echo -e "Building lambdas"
    for dir in */; do
        
        if [[ "$dir" == "node_modules/" ]] || [[ "$dir" == "dist/" ]]; then
            continue
        fi
        
        if [ -f "$dir/index.ts" ] || [ -f "$dir/index.js" ]; then
            ./build.sh "${dir%/}"
        fi
    done
    echo -e "Done building lambdas"
    exit 0
fi

echo -e "Building: $LAMBDA_DIR"

cd "$LAMBDA_DIR"

rm -f function.zip
rm -rf dist

# Check if TypeScript or JavaScript
if [ -f "index.ts" ]; then
    
    if [ -f "package.json" ]; then
        npm install
    fi
    
    ../node_modules/.bin/tsc

    cd dist
    find . -exec touch -t 202001010000 {} +
    find . -type f | LC_ALL=C sort | zip -X -@ ../function.zip
    cd ..

    if [ -f "package.json" ]; then
        npm ci --omit=dev
        find node_modules -exec touch -t 202001010000 {} +
        find node_modules -type f | LC_ALL=C sort | zip -X -@ function.zip
    fi

elif [ -f "index.js" ]; then

    touch -t 202001010000 index.js
    zip -X function.zip index.js

    if [ -f "package.json" ]; then
        npm ci --omit=dev
        find node_modules -exec touch -t 202001010000 {} +
        find node_modules -type f | LC_ALL=C sort | zip -X -@ function.zip
    fi
else
    exit 1
fi

echo -e "Created $LAMBDA_DIR/function.zip"
cd ..