// This script runs when the user is on ChatGPT
window.addEventListener('load', () => {
  // Initial setup attempt
  setTimeout(setupEnhanceButton, 1000);
  
  // Continue checking until we succeed
  const setupInterval = setInterval(() => {
    if (document.getElementById('enhance-prompt-btn')) {
      clearInterval(setupInterval);
    } else {
      setupEnhanceButton();
    }
  }, 2000);
});

// We also need to detect when the user navigates to a new chat
const observer = new MutationObserver((mutations) => {
  for (let mutation of mutations) {
    if (mutation.addedNodes.length) {
      const promptArea = getPromptTextarea();
      if (promptArea && !document.getElementById('enhance-prompt-btn')) {
        setupEnhanceButton();
      }
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });

function setupEnhanceButton() {
  const promptArea = getPromptTextarea();
  if (!promptArea) return;

  // Check if our button already exists
  if (document.getElementById('enhance-prompt-btn')) return;
  
  // Create the enhance button container styled like ChatGPT's other action buttons
  const enhanceBtn = document.createElement('button');
  enhanceBtn.id = 'enhance-prompt-btn';
  enhanceBtn.className = 'enhance-prompt-btn btn relative btn-primary btn-small flex items-center justify-center rounded-full border border-token-border-default p-1 text-token-text-secondary focus-visible:outline-black dark:text-token-text-secondary dark:focus-visible:outline-white bg-transparent dark:bg-transparent can-hover:hover:bg-token-main-surface-secondary dark:hover:bg-transparent dark:hover:opacity-100 h-9 min-h-9 w-9 min-w-9';
  enhanceBtn.setAttribute('type', 'button');
  enhanceBtn.setAttribute('aria-label', 'Enhance prompt');  enhanceBtn.innerHTML = `
    <div class="flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none" stroke="currentColor" stroke-width="32" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" class="h-[18px] w-[18px]">
        <polyline points="292 242.34 292 16 52 269.66 220 269.66 220 331.35 220 496 460 242.34 360.32 242.34"></polyline>
        <line x1="359.3" x2="396.06" y1="181.46" y2="144.63"></line>
        <line x1="115.95" x2="152.71" y1="377.39" y2="340.56"></line>
      </svg>
    </div>
    <span class="enhance-tooltip">Enhance</span>
  `;
  
  // Look specifically for the actions container highlighted in your screenshot
  const actionsContainer = document.querySelector('div[data-testid="composer-trailing-actions"]') || 
                           document.querySelector('.absolute.end-3.bottom-0.flex.items-center.gap-2');
                           
  if (actionsContainer) {
    // Get the first div inside the container (which holds the other buttons)
    const buttonContainer = actionsContainer.querySelector('.ms-auto.flex.items-center.gap-1\\.5');
    
    if (buttonContainer) {
      // Create a container span like the other buttons have
      const span = document.createElement('span');
      span.className = '';
      span.setAttribute('data-state', 'closed');
      
      // Add our button inside the span
      span.appendChild(enhanceBtn);
      
      // Insert at the beginning of the container
      buttonContainer.insertBefore(span, buttonContainer.firstChild);
      console.log('VoltArc: Enhance button added to actions container');
    } else {
      // If we can't find the inner container, just append to the main container
      actionsContainer.insertBefore(enhanceBtn, actionsContainer.firstChild);
      console.log('VoltArc: Enhance button added to actions container (direct)');
    }
  } else {
    // Fallback method - try other selectors that might find the right area
    const micButton = document.querySelector('button[aria-label="Dictate button"]');
    if (micButton && micButton.parentElement && micButton.parentElement.parentElement) {
      micButton.parentElement.parentElement.insertBefore(enhanceBtn, micButton.parentElement);
      console.log('VoltArc: Enhance button added next to mic button');
    } else {
      // Last resort - look for any buttons at the bottom of the chat interface
      const anyBottomButton = document.querySelector('.absolute.bottom-0 button');
      if (anyBottomButton && anyBottomButton.parentElement) {
        anyBottomButton.parentElement.insertBefore(enhanceBtn, anyBottomButton);
        console.log('VoltArc: Enhance button added next to bottom button');
      } else {
        console.error('VoltArc: Could not find a suitable container for the enhance button');
      }
    }
  }
  
  // Add click event listener
  enhanceBtn.addEventListener('click', enhancePrompt);
}

function getPromptTextarea() {
  // ChatGPT uses different selectors depending on the version
  return document.querySelector('textarea[data-id="root"]') || 
         document.querySelector('textarea[placeholder*="Send a message"]') ||
         document.querySelector('textarea.gpt-textarea') ||
         document.querySelector('#prompt-textarea') ||
         document.querySelector('textarea[data-id="prompt-textarea"]') ||
         // More generic approach - find any textarea in the chat interface
         document.querySelector('div[role="main"] textarea');
}

function enhancePrompt() {
  const promptArea = getPromptTextarea();
  if (!promptArea) return;
  
  // ChatGPT might use different ways to store the text value
  // Use a safe check to prevent "Cannot read properties of undefined" errors
  let textValue = '';
  try {
    textValue = (promptArea.value !== undefined) ? promptArea.value : 
               (promptArea.textContent !== undefined) ? promptArea.textContent : 
               (promptArea.innerText !== undefined) ? promptArea.innerText : '';
    
    // If no text value found, don't proceed
    if (!textValue || textValue.trim() === '') return;
  } catch (e) {
    console.error('VoltArc: Error getting text value', e);
    return;
  }

  const originalPrompt = textValue;
  const enhanceBtn = document.getElementById('enhance-prompt-btn');
  
  // Show loading state
  enhanceBtn.classList.add('loading');
  enhanceBtn.innerHTML = `
    <div class="enhance-spinner"></div>
    <span class="enhance-tooltip">Enhancing...</span>
  `;
  
  // Get the user's settings
  chrome.storage.sync.get(['provider', 'model', 'systemPrompt', 'openrouterApiKey'], function(data) {
    const provider = data.provider || 'pollinations';
    const model = data.model || 'mistral';
    const systemPrompt = data.systemPrompt || 'You are a Prompt Enhancer Assistant, designed to transform basic, vague, or minimal user prompts into highly detailed, LLM-optimized instructions. Your job is to rewrite user prompts so they:\n\nClearly communicate the user\'s intent.\nFollow prompt engineering best practices.\nEncourage better, more accurate LLM responses.\n\n🛠 Enhancement Guidelines (based on OpenAI best practices):\nWrite clear instructions\nUse direct, unambiguous language.\nAdd relevant context or examples\nFill in missing details if they are logically implied.\nSplit complex tasks into simpler subtasks, when necessary.\nEncourage step-by-step reasoning using phrases like "Think step by step" if applicable.\nUse delimiters for clarity if adding user data or multiple sections (e.g., text or ###)\nSpecify the desired output format: list, JSON, paragraph, table, code, etc.\nPreserve the user\'s tone and style, whether casual, formal, technical, or creative.\n\n🔁 Output Format:\nAlways return only the enhanced version of the prompt. Do not include explanations unless explicitly requested.';
    const apiKey = data.openrouterApiKey || '';
    
    const messages = [
      { 
        role: 'system', 
        content: systemPrompt 
      },
      { 
        role: 'user', 
        content: `Enhance this prompt: "${originalPrompt}"` 
      }
    ];
    
    // Create a function to handle successful responses
    function handleSuccess(data) {
      // Extract the enhanced prompt from the response
      const enhancedPrompt = data.choices[0].message.content;
      
      // Set the enhanced prompt in the textarea
      if ('value' in promptArea) {
        promptArea.value = enhancedPrompt;
      } else if ('textContent' in promptArea) {
        promptArea.textContent = enhancedPrompt;
      } else if (promptArea.innerText !== undefined) {
        promptArea.innerText = enhancedPrompt;
      }
      
      // Adjust the height of the textarea
      if (promptArea.style) {
        // Reset any previously set height
        promptArea.style.removeProperty('height');
      }
      
      // Trigger an input event to make sure ChatGPT recognizes the change
      const inputEvent = new Event('input', { bubbles: true });
      promptArea.dispatchEvent(inputEvent);
      
      // Reset button state with success indicator
      enhanceBtn.classList.remove('loading');
      enhanceBtn.classList.add('success');
      enhanceBtn.innerHTML = `
        <div class="flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-[18px] w-[18px]">
            <path d="M20 6L9 17l-5-5"></path>
          </svg>
        </div>
        <span class="enhance-tooltip">Enhanced!</span>
      `;
        // Reset button after a delay
      setTimeout(() => {
        enhanceBtn.classList.remove('success');
        enhanceBtn.innerHTML = `
          <div class="flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none" stroke="currentColor" stroke-width="32" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" class="h-[18px] w-[18px]">
              <polyline points="292 242.34 292 16 52 269.66 220 269.66 220 331.35 220 496 460 242.34 360.32 242.34"></polyline>
              <line x1="359.3" x2="396.06" y1="181.46" y2="144.63"></line>
              <line x1="115.95" x2="152.71" y1="377.39" y2="340.56"></line>
            </svg>
          </div>
          <span class="enhance-tooltip">Enhance</span>
        `;
      }, 2000);
    }
    
    // Create a function to handle errors
    function handleError(error) {
      console.error('VoltArc: Error enhancing prompt:', error);
      
      // Reset button with error state
      enhanceBtn.classList.remove('loading');
      enhanceBtn.classList.add('error');
      enhanceBtn.innerHTML = `
        <div class="flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-[18px] w-[18px]">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        </div>
        <span class="enhance-tooltip">Error!</span>
      `;
        // Reset button after a delay
      setTimeout(() => {
        enhanceBtn.classList.remove('error');
        enhanceBtn.innerHTML = `
          <div class="flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none" stroke="currentColor" stroke-width="32" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" class="h-[18px] w-[18px]">
              <polyline points="292 242.34 292 16 52 269.66 220 269.66 220 331.35 220 496 460 242.34 360.32 242.34"></polyline>
              <line x1="359.3" x2="396.06" y1="181.46" y2="144.63"></line>
              <line x1="115.95" x2="152.71" y1="377.39" y2="340.56"></line>
            </svg>
          </div>
          <span class="enhance-tooltip">Enhance</span>
        `;
      }, 2000);
    }
      // Use the selected provider
    if (provider === 'openrouter' && apiKey) {
      // For OpenRouter, we use the model ID directly from the dropdown
      // The model ID should already be in the correct format like "google/gemma-3-12b-it:free"
      console.log('VoltArc: Using OpenRouter with model:', model);
      
      try {
        // Using Chrome extension API to bypass CORS issues
        chrome.runtime.sendMessage({
          action: 'makeApiRequest',
          url: 'https://openrouter.ai/api/v1/chat/completions',
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://github.com/deepsuthar496/VoltArc',
            'X-Title': 'VoltArc ChatGPT Enhancer'
          },
          body: {
            model: model,
            messages: messages
          }
        }, function(response) {
          if (response && response.success) {
            handleSuccess(response.data);
          } else {
            handleError(new Error(response && response.error ? response.error : 'Failed to get response from OpenRouter'));
          }
        });
      } catch (error) {
        // Fallback to direct fetch if message passing fails (should not happen)
        fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://github.com/deepsuthar496/VoltArc',
            'X-Title': 'PVoltArc ChatGPT Enhancer'
          },
          body: JSON.stringify({
            model: model, // The full model ID like "google/gemma-3-12b-it:free"
            messages: messages
          })
        })
        .then(response => {
          if (!response.ok) {
            throw new Error(`OpenRouter API error: ${response.status} ${response.statusText}`);
          }
          return response.json();
        })
        .then(handleSuccess)
        .catch(handleError);
      }
    } else {
      // Use Pollinations AI as default or fallback
      console.log('VoltArc: Using Pollinations AI with model:', model);
      
      // For Pollinations AI, we use the simplified model names
      let pollinationsModel = model;
      if (model.includes('/')) {
        // If we have a full model ID (from OpenRouter), map it to a simple model name
        if (model.includes('openai')) {
          pollinationsModel = 'openai';
        } else if (model.includes('mistral')) {
          pollinationsModel = 'mistral';
        } else if (model.includes('llama')) {
          pollinationsModel = 'llama';
        } else if (model.includes('deepseek')) {
          pollinationsModel = 'deepseek-reasoning';
        } else {
          // Default to mistral if we can't map it
          pollinationsModel = 'mistral';
        }
      }
      
      try {
        // Using Chrome extension API to bypass CORS issues
        chrome.runtime.sendMessage({
          action: 'makeApiRequest',
          url: 'https://text.pollinations.ai/openai',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            model: pollinationsModel,
            messages: messages
          }
        }, function(response) {
          if (response && response.success) {
            handleSuccess(response.data);
          } else {
            handleError(new Error(response && response.error ? response.error : 'Failed to get response from Pollinations'));
          }
        });
      } catch (error) {
        // Fallback to direct fetch if message passing fails
        fetch(`https://text.pollinations.ai/openai`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: pollinationsModel,
            messages: messages
          })
        })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Pollinations API error: ${response.status} ${response.statusText}`);
          }
          return response.json();
        })      .then(handleSuccess)
      .catch(handleError);
      }
    }
  });
}
