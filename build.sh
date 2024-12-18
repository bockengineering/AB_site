#!/bin/bash
npm ci --only=production
cd client && npm install --production