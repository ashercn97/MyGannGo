import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';

const app = express();

dotenv.config()
// Proxy endpoint
app.use('/api/assignments', createProxyMiddleware({ 
    target: 'https://gannacademy.myschoolapp.com', // Target API
    changeOrigin: true,
    pathRewrite: {
        '^/api/assignments': '/api/DataDirect/AssignmentCenterAssignments/', // Rewrite path
    },
    onProxyReq: (proxyReq, req, res) => {
        // Add custom headers from the incoming request
        const { headers } = req;
        Object.keys(headers).forEach((key) => {
            proxyReq.setHeader(key, headers[key]);
        });

        // If you need to modify the query string or body, do it here
    },
    logLevel: 'debug', // Optional: change to 'silent' in production
}));

app.use('/api/schedule', createProxyMiddleware({ 
    target: 'https://gannacademy.myschoolapp.com', // Target API
    changeOrigin: true,
    pathRewrite: {
        '^/api/schedule': '/api/schedule/MyDayCalendarStudentList/', // Rewrite path
    },
    onProxyReq: (proxyReq, req, res) => {
        // Add custom headers from the incoming request
        const { headers } = req;
        Object.keys(headers).forEach((key) => {
            proxyReq.setHeader(key, headers[key]);
        });

        // If you need to modify the query string or body, do it here
    },
    logLevel: 'debug', // Optional: change to 'silent' in production
}));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
