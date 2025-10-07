// index.js (or server.js)

// 1. >>> Make sure the Middleware APM Agent is the VERY FIRST line of code <<<
// If your APM setup requires an SDK/Agent, it must be initialized first.
// Example (Use your actual Middleware agent setup if different):
// require('@middleware.io/node-apm').track({ 
//     serviceName: "YourServiceName", 
//     accessToken: "<MW_API_KEY>" 
// });

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// ----------------------------------------------------
// 1. HEALTHY ROUTE
app.get('/', (req, res) => {
  res.send('Hello Middleware! This is a healthy request.');
});

// ----------------------------------------------------
// 2. INTENTIONAL CRASH (UNHANDLED EXCEPTION) - Best for Ops AI Test
app.get('/test-ops-ai-error', (req, res) => {
    // This is the error-inducing code
    const data = null; 
    const result = data.someProperty; // This throws an unhandled exception (TypeError)
    
    // This line will NOT be reached
    res.send('Should not reach here'); 
});

// ----------------------------------------------------
// 3. INTENTIONAL ERROR (HANDLED) - Less ideal, but good for an immediate 500
app.get('/error', (req, res, next) => {
  // Pass the error to the Express error handler middleware
  next(new Error('Simulated error for testing Ops AI')); 
});


// ----------------------------------------------------
// 4. EXPRESS ERROR HANDLER (CRUCIAL for capturing handled errors)
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the stack trace for APM to capture
    res.status(500).send({
        message: err.message,
        error: 'Internal Server Error',
        details: 'Check your Middleware Ops AI dashboard now!'
    });
});


// ----------------------------------------------------
// 5. START SERVER
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Test Healthy: http://localhost:${PORT}/`);
  console.log(`Test Crash:   http://localhost:${PORT}/test-ops-ai-error`);
  console.log(`Test Handled: http://localhost:${PORT}/error`);
});