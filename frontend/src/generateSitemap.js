// generateSitemap.js

const fs = require('fs');
const { SitemapStream, streamToPromise } = require('sitemap');
const path = require('path'); // Import the path module

// Define the path to the public directory
const publicPath = path.join(__dirname, '../public'); // Assuming the public directory is located one level above the src directory

// Define your website URL
const hostname = "https://unzziptruth.com/";
// const hostname = "http://localhost:3100/"

// List all your routes
const routes = [
    '/',
    '/faq',
    '/ChatPage/:id',
    '/Privacy-policy',
    '/term&condition',
    '/mobile/payment',
    '/profile/:id',
    '/offChats',
    '/auth',
    '/horoscopy',
    '/Zodiac-Details/:_id',
    '/Blog',
    '/Blog-details/:_id',
    '/contact-us',
    '/astro-form',
    '/astro-signup-one',
    '/astro-About-us',
    '/astrologer/:id',
    '/astrologer-details/:id',
    '/search',
    '/home/landing',
    '/Astro/verification/:_id',
    '/Astro/IdsVerification/:_id',
];

// Create a SitemapStream
const sitemapStream = new SitemapStream({ hostname });

// Add each route to the sitemap
routes.forEach(route => {
    sitemapStream.write({ url: route });
});

// End the stream
sitemapStream.end();

// Convert the stream to a Promise
streamToPromise(sitemapStream)
    .then(data => {
        // Ensure that the public directory exists
        if (!fs.existsSync(publicPath)) {
            fs.mkdirSync(publicPath);
        }

        // Write the sitemap to a file in the public directory
        fs.writeFileSync(path.join(publicPath, 'sitemap.xml'), data);
        console.log('Sitemap generated successfully.');
    })
    .catch(err => {
        console.error('Error generating sitemap:', err);
    });
