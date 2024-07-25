const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api', // Replace with the path you use in your API requests
        createProxyMiddleware({
            target: 'https://divineapi.com', // Replace with your API server URL
            changeOrigin: true,
        })
    );
};