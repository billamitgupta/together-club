#!/bin/bash

# Environment Setup Script for Together.Club
echo "🔧 Setting up Together.Club environment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_warning "Node.js version is $NODE_VERSION. Recommended version is 18+."
fi

print_success "Node.js $(node -v) detected"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

print_success "npm $(npm -v) detected"

# Create environment files if they don't exist
print_status "Setting up environment files..."

# Server environment
if [ ! -f "server/.env" ]; then
    print_status "Creating server/.env from template..."
    cp server/.env.example server/.env
    print_warning "Please update server/.env with your actual values:"
    print_warning "  - MONGODB_URI (MongoDB Atlas connection string)"
    print_warning "  - RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET"
    print_warning "  - ALLOWED_ORIGINS (your frontend domain)"
else
    print_success "server/.env already exists"
fi

# Client environment
if [ ! -f "client/.env.local" ]; then
    print_status "Creating client/.env.local from template..."
    cp client/.env.local.example client/.env.local
    print_warning "Please update client/.env.local with your actual values:"
    print_warning "  - REACT_APP_RAZORPAY_KEY_ID"
    print_warning "  - REACT_APP_API_URL (your backend URL)"
else
    print_success "client/.env.local already exists"
fi

# Install dependencies
print_status "Installing dependencies..."

# Install server dependencies
print_status "Installing server dependencies..."
cd server
if npm install; then
    print_success "Server dependencies installed"
else
    print_error "Failed to install server dependencies"
    exit 1
fi
cd ..

# Install client dependencies
print_status "Installing client dependencies..."
cd client
if npm install; then
    print_success "Client dependencies installed"
else
    print_error "Failed to install client dependencies"
    exit 1
fi
cd ..

# Check if MongoDB is accessible (if local)
print_status "Checking MongoDB connection..."
if command -v mongosh &> /dev/null; then
    print_success "MongoDB shell (mongosh) is available"
elif command -v mongo &> /dev/null; then
    print_success "MongoDB shell (mongo) is available"
else
    print_warning "MongoDB shell not found. Make sure you have MongoDB Atlas setup or local MongoDB installed."
fi

# Create a simple test script
print_status "Creating test script..."
cat > test-setup.js << 'EOF'
const fs = require('fs');
const path = require('path');

console.log('🧪 Testing setup...');

// Check if required files exist
const requiredFiles = [
    'server/.env',
    'client/.env.local',
    'server/package.json',
    'client/package.json'
];

let allFilesExist = true;
requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file} exists`);
    } else {
        console.log(`❌ ${file} missing`);
        allFilesExist = false;
    }
});

if (allFilesExist) {
    console.log('🎉 Setup appears to be complete!');
    console.log('\nNext steps:');
    console.log('1. Update environment variables in server/.env and client/.env.local');
    console.log('2. Set up MongoDB Atlas database');
    console.log('3. Get Razorpay API keys');
    console.log('4. Run: npm run dev (from server directory)');
    console.log('5. Run: npm start (from client directory)');
} else {
    console.log('❌ Setup incomplete. Please check missing files.');
}
EOF

node test-setup.js
rm test-setup.js

print_success "Environment setup complete!"
print_status "Next steps:"
echo "  1. Update environment variables:"
echo "     - server/.env (MongoDB URI, Razorpay keys)"
echo "     - client/.env.local (Razorpay key, API URL)"
echo "  2. Start development:"
echo "     - Terminal 1: cd server && npm start"
echo "     - Terminal 2: cd client && npm start"
echo "  3. For production deployment, see DEPLOYMENT.md"

print_status "Happy coding! 🚀"