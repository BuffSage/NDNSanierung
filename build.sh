#!/bin/bash
set -e
rm -rf dist
mkdir -p dist/en dist/src
cp *.html dist/
cp en/*.html dist/en/
cp src/styles.css dist/src/
cp -r src/js dist/src/
cp -r src/assets dist/src/
