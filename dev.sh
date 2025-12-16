#!/bin/bash

# Development script for Together.Club
echo "🚀 Starting Together.Club development environment..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ] && [ ! -d "client" ] && [ ! -d "server" ]; then
    echo "❌ Please run this script from the project root directory"
    exit 1
fi

# Check if environment files exist
if [ ! -f "server/.env" ]; then
    print_warning "server/.env not found. Run ./setup-env.sh first"
    exit 1
fi

if [ ! -f "client/.env.local" ]; then
    print_warning "client/.env.local not found. Run ./setup-env.sh first"
    exit 1
fi

# Function to check if port is in use
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
        return 0  # Port is in use
    else
        return 1  # Port is free
    fi
}

# Check if ports are available
if check_port 5000; then
    print_warning "Port 5000 is already in use. Please stop the process or use a different port."
fi

if check_port 3000; then
    print_warning "Port 3000 is already in use. The client will prompt to use a different port."
fi

print_info "Starting backend server on port 5000..."
print_info "Starting frontend client on port 3000..."
print_info "Press Ctrl+C to stop both servers"

# Create a trap to kill background processes when script exits
trap 'kill $(jobs -p) 2>/dev/null' EXIT

# Start backend server in background
cd server
npm start &
SERVER_PID=$!
cd ..

# Wait a moment for server to start
sleep 3

# Start frontend client in background
cd client
npm start &
CLIENT_PID=$!
cd ..

print_success "Development environment started!"
print_info "Backend: http://localhost:5000"
print_info "Frontend: http://localhost:3000"
print_info "API Health Check: http://localhost:5000/health"

# Wait for both processes
wait $SERVER_PID $CLIENT_PID