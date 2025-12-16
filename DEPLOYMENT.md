# Deployment Guide - Together.Club

## Overview
This project consists of a React frontend and Node.js/Express backend, designed for deployment on Vercel (backend) and Netlify (frontend).

## Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account
- Razorpay account
- Vercel account
- Netlify account

## Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/togetherclub
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
PORT=5000
NODE_ENV=production
ALLOWED_ORIGINS=https://your-frontend-domain.netlify.app
```

### Frontend (.env.production)
```
REACT_APP_RAZORPAY_KEY_ID=your_production_razorpay_key_id
REACT_APP_API_URL=https://your-backend-domain.vercel.app
REACT_APP_SITE_URL=https://your-frontend-domain.netlify.app
```

## Deployment Steps

### 1. Backend Deployment (Vercel)

1. **Prepare the backend:**
   ```bash
   cd server
   npm install
   ```

2. **Deploy to Vercel:**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login to Vercel
   vercel login
   
   # Deploy from root directory
   vercel --prod
   ```

3. **Set environment variables in Vercel dashboard:**
   - Go to your project settings
   - Add all environment variables from server/.env.example

### 2. Frontend Deployment (Netlify)

1. **Prepare the frontend:**
   ```bash
   cd client
   npm install
   npm run build
   ```

2. **Deploy to Netlify:**
   - Connect your GitHub repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `client/build`
   - Add environment variables in Netlify dashboard

3. **Alternative - Netlify CLI:**
   ```bash
   # Install Netlify CLI
   npm i -g netlify-cli
   
   # Login to Netlify
   netlify login
   
   # Deploy from client directory
   cd client
   netlify deploy --prod --dir=build
   ```

### 3. Database Setup (MongoDB Atlas)

1. **Create MongoDB Atlas cluster:**
   - Sign up at mongodb.com/atlas
   - Create a new cluster
   - Create a database user
   - Whitelist IP addresses (0.0.0.0/0 for production)

2. **Get connection string:**
   - Replace `<username>`, `<password>`, and `<cluster-url>`
   - Add to backend environment variables

### 4. Payment Setup (Razorpay)

1. **Create Razorpay account:**
   - Sign up at razorpay.com
   - Get API keys from dashboard
   - Add to both frontend and backend environment variables

## Post-Deployment Checklist

### SEO & Performance
- [ ] Verify meta tags are working
- [ ] Check structured data with Google's Rich Results Test
- [ ] Submit sitemap to Google Search Console
- [ ] Test page load speed with PageSpeed Insights
- [ ] Verify mobile responsiveness

### Functionality
- [ ] Test payment flow end-to-end
- [ ] Verify form submissions
- [ ] Check API endpoints
- [ ] Test error handling
- [ ] Verify CORS configuration

### Security
- [ ] Ensure HTTPS is enabled
- [ ] Verify environment variables are secure
- [ ] Check CORS origins are properly configured
- [ ] Test rate limiting (if implemented)

## Monitoring & Analytics

### Add Google Analytics
```html
<!-- Add to client/public/index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Performance Monitoring
- Set up Vercel Analytics for backend
- Use Netlify Analytics for frontend
- Monitor Core Web Vitals

## Troubleshooting

### Common Issues

1. **CORS Errors:**
   - Verify ALLOWED_ORIGINS includes your frontend domain
   - Check protocol (http vs https)

2. **Payment Issues:**
   - Verify Razorpay keys are correct
   - Check webhook configuration

3. **Database Connection:**
   - Verify MongoDB URI format
   - Check IP whitelist settings

4. **Build Failures:**
   - Check Node.js version compatibility
   - Verify all dependencies are installed

### Logs
- **Vercel:** Check function logs in Vercel dashboard
- **Netlify:** Check deploy logs in Netlify dashboard
- **MongoDB:** Monitor Atlas logs for database issues

## Custom Domain Setup

### Frontend (Netlify)
1. Go to Domain settings in Netlify
2. Add custom domain
3. Configure DNS records

### Backend (Vercel)
1. Go to Domains in Vercel project
2. Add custom domain
3. Configure DNS records

## SSL/HTTPS
Both Netlify and Vercel provide automatic SSL certificates. Ensure:
- Force HTTPS redirects are enabled
- Update all API URLs to use HTTPS
- Update CORS origins to use HTTPS

## Backup Strategy
- **Database:** Enable MongoDB Atlas automated backups
- **Code:** Ensure GitHub repository is up to date
- **Environment Variables:** Keep secure backup of all env vars

## Support
For deployment issues:
1. Check platform-specific documentation
2. Review deployment logs
3. Test locally with production environment variables
4. Contact platform support if needed