// Background script to handle API requests without CORS issues
self.onmessage = (event) => {
  // Service worker is running
  console.log('VoltArc service worker is active');
};

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'makeApiRequest') {
    // Extract request details
    const { url, method, headers, body } = request;
    
    console.log('VoltArc: Making API request:', url);
    
    // Make the API request from the background script
    fetch(url, {
      method: method,
      headers: headers,
      body: JSON.stringify(body)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      // Send successful response back to content script
      sendResponse({ success: true, data: data });
    })
    .catch(error => {
      console.error('VoltArc: API request error:', error);
      // Send error back to content script
      sendResponse({ success: false, error: error.message });
    });
    
    // Return true to indicate we will send a response asynchronously
    return true;
  }
});

// Handle initial installation or update
chrome.runtime.onInstalled.addListener((details) => {
  console.log('VoltArc extension installed/updated:', details.reason);
});
