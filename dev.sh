#!/bin/bash
# Start the dev server and backend in parallel

echo "Starting Admin Dashboard..."

# Initialize database if needed
node server/config/dbInit.js

# Start backend server
node server/server.js &
SERVER_PID=$!

# Start frontend dev server
bun run dev &
FRONTEND_PID=$!

# Handle termination
trap "kill $SERVER_PID $FRONTEND_PID; exit" SIGINT SIGTERM

# Wait for processes to exit
wait
