#!/bin/bash

# Build script for Together.Club
echo "🚀 Building Together.Club for production..."

# Check if we're in the right directory
if [ ! -f "package.json" ] && [ ! -d "client" ] && [ ! -d "server" ]; then
    echo "❌ Please run this script from the project root directory"
    exit 1
fi

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd server
npm install --production
cd ..

# Install frontend dependencies and build
echo "📦 Installing frontend dependencies..."
cd client
npm install

echo "🔨 Building frontend..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Frontend build successful!"
else
    echo "❌ Frontend build failed!"
    exit 1
fi

cd ..

echo "🎉 Build complete! Ready for deployment."
echo ""
echo "Next steps:"
echo "1. Deploy backend to Vercel: vercel --prod"
echo "2. Deploy frontend to Netlify: netlify deploy --prod --dir=client/build"
echo "3. Update environment variables on both platforms"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions"