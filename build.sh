#!/bin/bash
# Install server dependencies
npm ci --only=production

# Install and build client
cd client
npm install --production
npm run build
cd ..