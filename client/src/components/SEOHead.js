import { useEffect, useMemo } from 'react';

const SEOHead = () => {
  const siteUrl = process.env.REACT_APP_SITE_URL || 'https://together.club';
  const title = 'Together.Club - Elite New Year Experience 2025 | Himalayan Luxury Retreat';
  const description = 'Join India\'s most exclusive travel community for the ultimate New Year experience. 200 elite creators, Himalayan luxury estates, premium networking. Dec 29 - Jan 3, 2025.';
  const keywords = 'luxury travel, new year 2025, himalayan retreat, elite creators, exclusive community, premium networking, influencer events, luxury experiences, together club';
  const image = `${siteUrl}/og-image.jpg`;

  const structuredData = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "Together.Club New Year Himalayan Experience 2025",
    "description": description,
    "startDate": "2025-12-29T00:00:00+05:30",
    "endDate": "2026-01-03T23:59:59+05:30",
    "location": {
      "@type": "Place",
      "name": "Himalayan Luxury Estates",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IN",
        "addressRegion": "Himachal Pradesh"
      }
    },
    "organizer": {
      "@type": "Organization",
      "name": "Together.Club",
      "url": siteUrl
    },
    "offers": {
      "@type": "Offer",
      "price": "24999",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "validFrom": "2024-12-01T00:00:00+05:30"
    },
    "image": image,
    "url": siteUrl
  }), [description, siteUrl, image]);

  const organizationData = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Together.Club",
    "url": siteUrl,
    "logo": `${siteUrl}/logo.png`,
    "description": "India's most exclusive travel community for elite creators and influencers",
    "sameAs": [
      "https://instagram.com/together.club",
      "https://twitter.com/togetherclub"
    ]
  }), [siteUrl]);

  useEffect(() => {
    // Set document title
    document.title = title;

    // Function to set or update meta tag
    const setMetaTag = (name, content, property = false) => {
      const attribute = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Function to set or update link tag
    const setLinkTag = (rel, href, attributes = {}) => {
      let link = document.querySelector(`link[rel="${rel}"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
      Object.entries(attributes).forEach(([key, value]) => {
        link.setAttribute(key, value);
      });
    };

    // Function to set or update script tag
    const setScriptTag = (id, content) => {
      let script = document.getElementById(id);
      if (script) {
        script.remove();
      }
      script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(content);
      document.head.appendChild(script);
    };

    // Basic Meta Tags
    setMetaTag('description', description);
    setMetaTag('keywords', keywords);
    setMetaTag('author', 'Together.Club');
    setMetaTag('robots', 'index, follow');
    setMetaTag('theme-color', '#667eea');

    // Open Graph Meta Tags
    setMetaTag('og:type', 'website', true);
    setMetaTag('og:title', title, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:image', image, true);
    setMetaTag('og:image:width', '1200', true);
    setMetaTag('og:image:height', '630', true);
    setMetaTag('og:url', siteUrl, true);
    setMetaTag('og:site_name', 'Together.Club', true);
    setMetaTag('og:locale', 'en_IN', true);

    // Twitter Card Meta Tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', image);
    setMetaTag('twitter:site', '@togetherclub');
    setMetaTag('twitter:creator', '@togetherclub');

    // Additional SEO Meta Tags
    setMetaTag('geo.region', 'IN');
    setMetaTag('geo.placename', 'India');
    setMetaTag('language', 'English');
    setMetaTag('distribution', 'global');
    setMetaTag('rating', 'general');

    // Canonical URL
    setLinkTag('canonical', siteUrl);

    // Preconnect to external domains
    setLinkTag('preconnect', 'https://fonts.googleapis.com');
    setLinkTag('preconnect', 'https://fonts.gstatic.com', { crossorigin: 'true' });
    setLinkTag('preconnect', 'https://checkout.razorpay.com');

    // Structured Data
    setScriptTag('structured-data-event', structuredData);
    setScriptTag('structured-data-organization', organizationData);

    // Cleanup function
    return () => {
      // Optional: Clean up meta tags when component unmounts
      // This is usually not necessary for SEO tags
    };
  }, [title, description, keywords, image, siteUrl, structuredData, organizationData]);

  return null; // This component doesn't render anything visible
};

export default SEOHead;