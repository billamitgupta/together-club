# Logo Update Instructions

## Files to Replace

You need to replace these files with the new Together.Club logo:

### 1. Favicon (16x16, 32x32, 48x48)
- **File**: `client/public/favicon.ico`
- **Format**: ICO format with multiple sizes
- **Sizes**: 16x16, 32x32, 48x48 pixels

### 2. App Icons
- **File**: `client/public/logo192.png`
- **Format**: PNG
- **Size**: 192x192 pixels
- **Usage**: PWA icon, Apple touch icon

- **File**: `client/public/logo512.png`
- **Format**: PNG  
- **Size**: 512x512 pixels
- **Usage**: PWA icon, high-res displays

### 3. Open Graph Image
- **File**: `client/public/og-image.jpg`
- **Format**: JPG
- **Size**: 1200x630 pixels (recommended for social sharing)
- **Usage**: Social media previews

## How to Create the Files

### Option 1: Online Tools
1. Go to https://favicon.io/favicon-converter/
2. Upload your Together.Club logo
3. Download the generated files
4. Replace the files in `client/public/`

### Option 2: Manual Creation
1. **For favicon.ico**: Use an online ICO converter or Photoshop
2. **For PNG files**: Resize the logo to exact dimensions
3. **For og-image.jpg**: Create a 1200x630 social media banner

## Quick Commands

After replacing the files, rebuild and redeploy:

```bash
# Build frontend
cd client && npm run build

# Deploy to Netlify (drag client/build folder)
# Or use: netlify deploy --prod --dir=build
```

## Current Logo References

The following files already reference the correct logo paths:
- ✅ `client/public/index.html` - Updated favicon and apple-touch-icon links
- ✅ `client/public/manifest.json` - Updated PWA icon references
- ✅ App components will automatically use the new logos

## Verification

After updating, check:
1. Browser tab shows new favicon
2. PWA install prompt shows new icon
3. Social media shares show new og-image
4. Apple devices show new touch icon