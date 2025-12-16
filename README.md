# Together.Club - Elite New Year Experience 2025

A premium MERN stack website for India's most exclusive travel community, featuring the ultimate Himalayan New Year experience with Razorpay payment integration and comprehensive SEO optimization.

## 🌟 Features

- 🎨 **Premium Mobile-First UI/UX**: Modern, responsive design with glassmorphism effects
- 💳 **Razorpay Integration**: Secure payment processing for bookings
- 📱 **Mobile-First Design**: Optimized for all devices with progressive enhancement
- 🔐 **Invite-Only System**: Curated elite community with application process
- 📊 **Real-time Slot Tracking**: Dynamic availability updates
- 🎯 **Creator-Focused**: Designed for content creators and influencers
- 🚀 **Production Ready**: Configured for Vercel and Netlify deployment
- 🔍 **SEO Optimized**: Complete SEO implementation with structured data
- ✨ **Enhanced Effects**: Sparkle animations and premium visual effects

## 🛠 Tech Stack

- **Frontend**: React.js, CSS3 with modern animations, React Helmet Async
- **Backend**: Node.js, Express.js with production middleware
- **Database**: MongoDB with Mongoose
- **Payment**: Razorpay with verification
- **Deployment**: Vercel (Backend) + Netlify (Frontend)
- **SEO**: Structured data, meta tags, sitemap, robots.txt
- **Styling**: Mobile-first CSS with glassmorphism and gradient effects

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Razorpay account

### 1. Clone and Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Environment Configuration

**Server (.env)**:
```env
MONGODB_URI=mongodb://localhost:27017/togetherclub
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
PORT=5000
```

**Client (.env)**:
```env
REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key_id
REACT_APP_API_URL=http://localhost:5000
```

### 3. Razorpay Setup

1. Create account at [Razorpay](https://razorpay.com)
2. Get API keys from Dashboard
3. Update environment variables
4. Enable required payment methods

### 4. MongoDB Setup

```bash
# Start MongoDB locally
mongod

# Or use MongoDB Atlas cloud database
# Update MONGODB_URI in server/.env
```

### 5. Run the Application

```bash
# Start server (from server directory)
npm start

# Start client (from client directory)
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Project Structure

```
together-club/
├── client/                 # React frontend
│   ├── src/
│   │   ├── App.js         # Main component
│   │   ├── App.css        # Premium styling
│   │   └── ...
│   ├── public/
│   └── package.json
├── server/                 # Express backend
│   ├── models/            # MongoDB models
│   │   ├── Booking.js
│   │   └── InviteRequest.js
│   ├── routes/            # API routes
│   │   ├── api.js         # Main API endpoints
│   │   └── ...
│   ├── app.js             # Express app
│   └── package.json
└── README.md
```

## API Endpoints

- `POST /api/create-order` - Create Razorpay order
- `POST /api/verify-payment` - Verify payment
- `POST /api/request-invite` - Submit invite request
- `GET /api/available-slots` - Get available slots
- `GET /api/bookings` - Get all bookings (admin)
- `GET /api/invite-requests` - Get invite requests (admin)

## Key Features Implementation

### Payment Flow
1. User fills booking form
2. Razorpay order created on backend
3. Payment processed through Razorpay
4. Payment verification and booking confirmation
5. Real-time slot updates

### Invite System
1. Users can request invites
2. Applications stored in MongoDB
3. Admin can review and approve/reject
4. Curated community management

### Premium UI Elements
- Glassmorphism cards and modals
- Gradient text effects
- Smooth animations and transitions
- Responsive grid layouts
- Interactive hover effects

## Customization

### Styling
- Modify `client/src/App.css` for design changes
- Update color schemes in CSS variables
- Adjust animations and transitions

### Content
- Update text content in `client/src/App.js`
- Modify pricing and package details
- Customize form fields and validation

### Payment
- Configure Razorpay settings
- Update pricing logic
- Add additional payment methods

## 🚀 Quick Deployment

### Automated Build
```bash
# Run the build script
./build.sh
```

### Manual Deployment

**Backend (Vercel):**
```bash
# Deploy backend to Vercel
vercel --prod
```

**Frontend (Netlify):**
```bash
# Deploy frontend to Netlify
cd client
netlify deploy --prod --dir=build
```

**📖 For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)**

## 🌐 Production URLs
- **Frontend**: Deploy to Netlify for optimal performance
- **Backend**: Deploy to Vercel for serverless functions
- **Database**: MongoDB Atlas for cloud database

## 🔒 Security & SEO Features

### Security
- Environment variables for sensitive data
- Payment signature verification
- Input validation and sanitization
- Production CORS configuration
- Error handling middleware
- Health check endpoints

### SEO Optimization
- **Meta Tags**: Comprehensive meta tag implementation
- **Structured Data**: JSON-LD for events and organization
- **Open Graph**: Social media sharing optimization
- **Twitter Cards**: Enhanced Twitter sharing
- **Sitemap**: XML sitemap for search engines
- **Robots.txt**: Search engine crawling instructions
- **Performance**: Optimized loading and Core Web Vitals

## 📋 Available Scripts

### Development
```bash
./setup-env.sh    # Initial environment setup
./dev.sh          # Start both frontend and backend
./build.sh        # Build for production
```

### Individual Commands
```bash
# Backend
cd server && npm start          # Start backend server
cd server && npm run dev        # Start with nodemon

# Frontend  
cd client && npm start          # Start development server
cd client && npm run build      # Build for production
cd client && npm test           # Run tests
```

## 📚 Documentation

- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Detailed deployment guide
- **[DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)** - Pre-launch checklist
- **Environment Examples** - `.env.example` files in both directories

## 🎯 Key Features Implemented

### Frontend
- ✅ Mobile-first responsive design
- ✅ React 19 compatible SEO solution
- ✅ Sparkle animation effects
- ✅ Progressive Web App (PWA) support
- ✅ Service Worker for offline caching
- ✅ Health check monitoring (dev mode)
- ✅ Loading states and error handling
- ✅ Form validation and UX improvements

### Backend
- ✅ Production-ready Express server
- ✅ MongoDB integration with Mongoose
- ✅ Razorpay payment processing
- ✅ CORS configuration for production
- ✅ Error handling middleware
- ✅ Health check endpoints
- ✅ Environment-based configuration

### SEO & Performance
- ✅ Meta tags and Open Graph
- ✅ Structured data (JSON-LD)
- ✅ Sitemap and robots.txt
- ✅ Performance optimizations
- ✅ Core Web Vitals optimization

## 🚀 Quick Start

1. **Clone and setup:**
   ```bash
   git clone <repository>
   cd together-club
   ./setup-env.sh
   ```

2. **Configure environment variables:**
   - Update `server/.env` with your MongoDB and Razorpay credentials
   - Update `client/.env.local` with your Razorpay key and API URL

3. **Start development:**
   ```bash
   ./dev.sh
   ```

4. **Deploy to production:**
   ```bash
   ./build.sh
   # Follow DEPLOYMENT.md for platform-specific steps
   ```

## 🔧 Troubleshooting

### Common Issues
- **Port conflicts**: Use different ports or stop conflicting processes
- **Environment variables**: Ensure all required variables are set
- **Dependencies**: Run `npm install` in both client and server directories
- **Build failures**: Check Node.js version (18+ recommended)

### Getting Help
- Check the deployment checklist for common deployment issues
- Review environment variable examples
- Ensure MongoDB Atlas and Razorpay are properly configured

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary software for Together.Club.

## 🎉 Support

For technical support or customization requests:
- Review the documentation files
- Check the deployment checklist
- Ensure all environment variables are properly configured

---

**Together.Club** - Where elite experiences begin. ✨

*Built with ❤️ using React, Node.js, and modern web technologies.*