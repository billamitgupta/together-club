#!/bin/bash

echo "🚀 Deploying Frontend to Netlify..."

# Navigate to client directory
cd client

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf build/

# Install dependencies (if needed)
echo "📦 Installing dependencies..."
npm install

# Build with production environment
echo "🔨 Building for production..."
REACT_APP_API_URL=https://server-nine-sigma-44.vercel.app npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📁 Build files ready in client/build/"
    echo ""
    echo "🌐 To deploy to Netlify:"
    echo "1. Go to https://app.netlify.com/sites/together-club-fe/deploys"
    echo "2. Drag and drop the client/build folder"
    echo "3. Or use: netlify deploy --prod --dir=build"
    echo ""
    echo "🔍 API URL in build: $(grep -o 'server-nine-sigma-44\.vercel\.app' build/static/js/*.js | head -1)"
else
    echo "❌ Build failed!"
    exit 1
fi