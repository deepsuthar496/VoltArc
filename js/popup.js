document.addEventListener('DOMContentLoaded', function() {
  const chatGptButton = document.getElementById('go-to-chatgpt');
  const saveSettingsButton = document.getElementById('save-settings');
  const providerSelect = document.getElementById('provider-select');
  const modelSelect = document.getElementById('model-select');
  const systemPrompt = document.getElementById('system-prompt');
  const saveMessage = document.getElementById('save-message');
  const openrouterSettings = document.getElementById('openrouter-settings');
  const openrouterApiKey = document.getElementById('openrouter-api-key');
    // Add Pollinations icon to the provider dropdown
  function enhanceProviderDropdown() {
    // Replace the standard select with a custom dropdown
    const selectContainer = document.createElement('div');
    selectContainer.className = 'custom-provider-dropdown';
    selectContainer.style.width = '100%';
    selectContainer.style.position = 'relative';
    
    // Create the selected display button
    const selectedDisplay = document.createElement('div');
    selectedDisplay.className = 'custom-select-button';
    selectedDisplay.style.display = 'flex';
    selectedDisplay.style.alignItems = 'center';
    selectedDisplay.style.justifyContent = 'space-between';
    
    // Create left side with icon and text
    const selectedText = document.createElement('div');
    selectedText.className = 'selected-text';
    selectedText.style.display = 'flex';
    selectedText.style.alignItems = 'center';
    
    // Create icon container
    const iconContainer = document.createElement('div');
    iconContainer.className = 'icon-container';
    iconContainer.style.marginRight = '10px';
    iconContainer.style.width = '20px';
    iconContainer.style.height = '20px';
    iconContainer.style.display = 'flex';
    iconContainer.style.alignItems = 'center';
    iconContainer.style.justifyContent = 'center'; // Added for better centering
    
    // Create icon for Pollinations with better handling
    const pollinationsIcon = document.createElement('img');
    pollinationsIcon.src = '../icons/pollinations.svg';
    pollinationsIcon.alt = 'Pollinations AI';
    pollinationsIcon.style.width = '100%';
    pollinationsIcon.style.height = '100%';
    pollinationsIcon.style.filter = 'brightness(1.2) contrast(1.1)'; // Improve visibility
    
    // Add error handling for image loading
    pollinationsIcon.onerror = function() {
      console.error('Failed to load Pollinations icon');
      // Create a simple text fallback
      const fallbackIcon = document.createElement('div');
      fallbackIcon.textContent = 'P';
      fallbackIcon.style.fontSize = '16px';
      fallbackIcon.style.fontWeight = 'bold';
      fallbackIcon.style.color = '#10a37f'; // Match the green brand color
      iconContainer.innerHTML = '';
      iconContainer.appendChild(fallbackIcon);
    };

    // Create OpenRouter icon with similar handling
    const openRouterIcon = document.createElement('img');
    openRouterIcon.src = '../icons/openrouter.svg';
    openRouterIcon.alt = 'OpenRouter';
    openRouterIcon.style.width = '100%';
    openRouterIcon.style.height = '100%';
    openRouterIcon.style.filter = 'brightness(1.2) contrast(1.1)';
    
    // Add error handling for OpenRouter icon loading
    openRouterIcon.onerror = function() {
      console.error('Failed to load OpenRouter icon');
      // Create a simple text fallback
      const fallbackIcon = document.createElement('div');
      fallbackIcon.textContent = 'OR';
      fallbackIcon.style.fontSize = '12px';
      fallbackIcon.style.fontWeight = 'bold';
      fallbackIcon.style.color = '#7c3aed'; // Purple color for OpenRouter
      fallbackIcon.style.textAlign = 'center';
      fallbackIcon.style.lineHeight = '20px';
      iconContainer.innerHTML = '';
      iconContainer.appendChild(fallbackIcon);
    };
    
    // Add dropdown arrow
    const arrow = document.createElement('span');
    arrow.textContent = '▼';
    arrow.style.fontSize = '10px';
    arrow.style.marginLeft = '5px';
    
    // Add options dropdown
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'custom-select-dropdown';
    optionsContainer.style.display = 'none';
    optionsContainer.style.position = 'absolute';
    optionsContainer.style.top = '100%';
    optionsContainer.style.left = '0';
    optionsContainer.style.width = '100%';
    optionsContainer.style.zIndex = '100';
    optionsContainer.style.marginTop = '4px';
    optionsContainer.style.borderRadius = '8px';
    optionsContainer.style.border = '1px solid #e4e4e7';
    optionsContainer.style.backgroundColor = 'white';
    optionsContainer.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    
    // Create pollinations option
    const pollinationsOption = document.createElement('div');
    pollinationsOption.className = 'provider-option';
    pollinationsOption.dataset.value = 'pollinations';
    pollinationsOption.style.display = 'flex';
    pollinationsOption.style.alignItems = 'center';
    pollinationsOption.style.padding = '10px 12px';
    pollinationsOption.style.cursor = 'pointer';
    
    // Clone icon for the option with the same improvements
    const pollinationsOptionIcon = document.createElement('img');
    pollinationsOptionIcon.src = '../icons/pollinations.svg';
    pollinationsOptionIcon.alt = 'Pollinations AI ( Free )';
    pollinationsOptionIcon.style.width = '20px';
    pollinationsOptionIcon.style.height = '20px';
    pollinationsOptionIcon.style.marginRight = '10px';
    pollinationsOptionIcon.style.filter = 'brightness(1.2) contrast(1.1)';
    
    // Add error handling for option icon
    pollinationsOptionIcon.onerror = function() {
      // Create a simple text fallback for the option
      const fallbackOptionIcon = document.createElement('div');
      fallbackOptionIcon.textContent = 'P';
      fallbackOptionIcon.style.fontSize = '16px';
      fallbackOptionIcon.style.fontWeight = 'bold';
      fallbackOptionIcon.style.width = '20px';
      fallbackOptionIcon.style.height = '20px';
      fallbackOptionIcon.style.display = 'flex';
      fallbackOptionIcon.style.alignItems = 'center';
      fallbackOptionIcon.style.justifyContent = 'center';
      fallbackOptionIcon.style.color = '#10a37f';
      fallbackOptionIcon.style.marginRight = '10px';
      
      // Replace the img with the fallback
      pollinationsOption.insertBefore(fallbackOptionIcon, pollinationsOption.firstChild);
      pollinationsOption.removeChild(pollinationsOptionIcon);
    };
    
    const pollinationsText = document.createElement('span');
    pollinationsText.textContent = 'Pollinations AI ( Free )';
    
    pollinationsOption.appendChild(pollinationsOptionIcon);
    pollinationsOption.appendChild(pollinationsText);
    
    // Create OpenRouter option with icon
    const openRouterOption = document.createElement('div');
    openRouterOption.className = 'provider-option';
    openRouterOption.dataset.value = 'openrouter';
    openRouterOption.style.display = 'flex';
    openRouterOption.style.alignItems = 'center';
    openRouterOption.style.padding = '10px 12px';
    openRouterOption.style.cursor = 'pointer';
    
    // Create icon container for OpenRouter option
    const openRouterIconContainer = document.createElement('div');
    openRouterIconContainer.style.width = '20px';
    openRouterIconContainer.style.height = '20px';
    openRouterIconContainer.style.marginRight = '10px';
    openRouterIconContainer.style.display = 'flex';
    openRouterIconContainer.style.alignItems = 'center';
    openRouterIconContainer.style.justifyContent = 'center';
    
    // Clone icon for the option
    const openRouterOptionIcon = document.createElement('img');
    openRouterOptionIcon.src = '../icons/openrouter.svg';
    openRouterOptionIcon.alt = 'OpenRouter ( Free Models )';
    openRouterOptionIcon.style.width = '20px';
    openRouterOptionIcon.style.height = '20px';
    openRouterOptionIcon.style.filter = 'brightness(1.2) contrast(1.1)';
    
    // Add error handling for OpenRouter option icon
    openRouterOptionIcon.onerror = function() {
      // Create a simple text fallback
      const fallbackOptionIcon = document.createElement('div');
      fallbackOptionIcon.textContent = 'OR';
      fallbackOptionIcon.style.fontSize = '12px';
      fallbackOptionIcon.style.fontWeight = 'bold';
      fallbackOptionIcon.style.width = '20px';
      fallbackOptionIcon.style.height = '20px';
      fallbackOptionIcon.style.display = 'flex';
      fallbackOptionIcon.style.alignItems = 'center';
      fallbackOptionIcon.style.justifyContent = 'center';
      fallbackOptionIcon.style.color = '#7c3aed'; // Purple color for OpenRouter
      
      // Replace with fallback
      openRouterIconContainer.innerHTML = '';
      openRouterIconContainer.appendChild(fallbackOptionIcon);
    };
    
    openRouterIconContainer.appendChild(openRouterOptionIcon);
    
    const openRouterText = document.createElement('span');
    openRouterText.textContent = 'OpenRouter ( Free Models )';
    
    openRouterOption.appendChild(openRouterIconContainer);
    openRouterOption.appendChild(openRouterText);
    
    // Add hover effect
    pollinationsOption.addEventListener('mouseover', () => {
      pollinationsOption.style.backgroundColor = '#f4f4f5';
    });
    
    pollinationsOption.addEventListener('mouseout', () => {
      pollinationsOption.style.backgroundColor = '';
    });
    
    openRouterOption.addEventListener('mouseover', () => {
      openRouterOption.style.backgroundColor = '#f4f4f5';
    });
    
    openRouterOption.addEventListener('mouseout', () => {
      openRouterOption.style.backgroundColor = '';
    });
    
    // Update the selected display based on current selection
    function updateSelectedDisplay() {
      const value = providerSelect.value;
      selectedText.innerHTML = '';
      
      if (value === 'pollinations') {
        iconContainer.innerHTML = '';
        const currentIcon = pollinationsIcon.cloneNode(true);
        currentIcon.onerror = pollinationsIcon.onerror;
        iconContainer.appendChild(currentIcon);
        selectedText.appendChild(iconContainer);
        selectedText.appendChild(document.createTextNode('Pollinations AI ( Free )'));
      } else {
        iconContainer.innerHTML = '';
        const currentIcon = openRouterIcon.cloneNode(true);
        currentIcon.onerror = openRouterIcon.onerror;
        iconContainer.appendChild(currentIcon);
        selectedText.appendChild(iconContainer);
        selectedText.appendChild(document.createTextNode('OpenRouter ( Free Models )'));
      }
    }
      // Initial update
    updateSelectedDisplay();
    
    // Add click handlers
    selectedDisplay.addEventListener('click', (e) => {
      e.stopPropagation();
      const isVisible = optionsContainer.style.display === 'block';
      optionsContainer.style.display = isVisible ? 'none' : 'block';
    });
    
    // Handle option selection
    pollinationsOption.addEventListener('click', () => {
      providerSelect.value = 'pollinations';
      providerSelect.dispatchEvent(new Event('change'));
      updateSelectedDisplay();
      optionsContainer.style.display = 'none';
    });
    
    openRouterOption.addEventListener('click', () => {
      providerSelect.value = 'openrouter';
      providerSelect.dispatchEvent(new Event('change'));
      updateSelectedDisplay();
      optionsContainer.style.display = 'none';
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
      optionsContainer.style.display = 'none';
    });
    
    // Build the structure
    optionsContainer.appendChild(pollinationsOption);
    optionsContainer.appendChild(openRouterOption);
    
    selectedDisplay.appendChild(selectedText);
    selectedDisplay.appendChild(arrow);
    
    selectContainer.appendChild(selectedDisplay);
    selectContainer.appendChild(optionsContainer);
    
    // Add the whole thing to the page and hide the original select
    providerSelect.parentNode.insertBefore(selectContainer, providerSelect);
    providerSelect.style.display = 'none';
    
    // Handle dark mode
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
    
    function updateDarkMode() {
      if (prefersDarkMode.matches) {
        selectedDisplay.style.backgroundColor = '#27272a';
        selectedDisplay.style.borderColor = '#3f3f46';
        selectedDisplay.style.color = '#f4f4f5';
        
        optionsContainer.style.backgroundColor = '#27272a';
        optionsContainer.style.borderColor = '#3f3f46';
        
        // Adjust icon filter for better visibility in dark mode
        if (pollinationsIcon) {
          pollinationsIcon.style.filter = 'brightness(2) contrast(1.2)';
        }
        if (pollinationsOptionIcon) {
          pollinationsOptionIcon.style.filter = 'brightness(2) contrast(1.2)';
        }
        if (openRouterIcon) {
          openRouterIcon.style.filter = 'brightness(2) contrast(1.2)';
        }
        if (openRouterOptionIcon) {
          openRouterOptionIcon.style.filter = 'brightness(2) contrast(1.2)';
        }
        
        pollinationsOption.addEventListener('mouseover', () => {
          pollinationsOption.style.backgroundColor = '#333';
        });
        
        pollinationsOption.addEventListener('mouseout', () => {
          pollinationsOption.style.backgroundColor = '';
        });
        
        openRouterOption.addEventListener('mouseover', () => {
          openRouterOption.style.backgroundColor = '#333';
        });
        
        openRouterOption.addEventListener('mouseout', () => {
          openRouterOption.style.backgroundColor = '';
        });
      } else {
        // Reset filter for light mode if needed
        if (pollinationsIcon) {
          pollinationsIcon.style.filter = 'brightness(1.2) contrast(1.1)';
        }
        if (pollinationsOptionIcon) {
          pollinationsOptionIcon.style.filter = 'brightness(1.2) contrast(1.1)';
        }
        if (openRouterIcon) {
          openRouterIcon.style.filter = 'brightness(1.2) contrast(1.1)';
        }
        if (openRouterOptionIcon) {
          openRouterOptionIcon.style.filter = 'brightness(1.2) contrast(1.1)';
        }
      }
    }
    
    updateDarkMode();
    prefersDarkMode.addEventListener('change', updateDarkMode);
  }
  
  // Call the function to enhance provider dropdown
  enhanceProviderDropdown();
  
  // Default system prompt
  const defaultSystemPrompt = 'You are a Prompt Enhancement Specialist, tasked with transforming basic, vague, or minimal user prompts into highly detailed, LLM-optimized instructions to maximize output quality and accuracy. When enhancing a prompt, follow these guidelines:  \n1. Clearly interpret and articulate the user\'s intent, removing ambiguity.  \n2. Use precise, direct language to ensure clarity.  \n3. Incorporate relevant context, examples, or constraints to guide the LLM effectively.  \n4. Fill in logically implied details while preserving the original intent.  \n5. Break complex tasks into clear, manageable subtasks when applicable.  \n6. Encourage step-by-step reasoning with phrases like \"Reason through the problem step by step\" for analytical tasks.  \n7. Use delimiters (e.g., ###, ---) to separate sections or user-provided data for clarity.  \n8. Specify the desired output format (e.g., paragraph, bullet list, JSON, table, code block) to align with the user\'s goal.  \n9. Maintain the user\'s tone and style (e.g., casual, formal, technical, creative).  \n10. Avoid adding unnecessary complexity while ensuring the prompt is comprehensive.  \n\nGiven a user prompt, rewrite it to produce the highest quality LLM output by applying the above principles. Return only the enhanced prompt in the specified output format, without explanations or additional commentary.  \n\n### Task  \nEnhance the following user prompt to optimize it for an LLM to generate the maximum quality output:  \n\"[Original prompt text]\"  \n\n### Output Format  \nReturn the enhanced prompt as a single, cohesive instruction set, preserving the user\'s tone and intent, and specifying the desired output format if implied or necessary.';
    // Fetch OpenRouter models
  async function fetchOpenRouterModels(apiKey) {
    if (!apiKey) {
      console.log('VoltArc: No OpenRouter API key provided');
      return;
    }
    
    try {
      // Show loading state in the model dropdown
      modelSelect.innerHTML = '<option value="">Loading models...</option>';
      
      const response = await fetch('https://openrouter.ai/api/v1/models', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch models: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Clear allOpenRouterModels array
      allOpenRouterModels = [];
      
      if (data.data && data.data.length > 0) {
        // Process models and store in allOpenRouterModels array
        data.data.forEach(model => {
          // Extract provider and model name
          const fullId = model.id;
          const parts = fullId.split('/');
          
          if (parts.length >= 2) {
            // Add to all models array
            allOpenRouterModels.push({
              id: fullId,
              name: model.name || parts.slice(1).join('/'),
              contextLength: model.context_length
            });
          }
        });
        
        // Clear the search field
        if (modelSearch) {
          modelSearch.value = '';
        }
        
        // Display all models
        displayModels(allOpenRouterModels);
        
        console.log(`VoltArc: Loaded ${data.data.length} models from OpenRouter`);
      } else {
        // Fallback to default models
        addDefaultModels();
        console.log('VoltArc: No models found, using defaults');
      }
    } catch (error) {
      console.error('VoltArc: Error fetching OpenRouter models:', error);
      addDefaultModels();
    }
  }
    // Add default models when OpenRouter fetch fails or when using Pollinations
  function addDefaultModels() {
    // Update the hidden select element
    modelSelect.innerHTML = `
      <option value="mistral">Mistral</option>
      <option value="openai">OpenAI</option>
      <option value="llama">Llama</option>
      <option value="deepseek-reasoning">DeepSeek Reasoning</option>
    `;
    
    // Also update the custom dropdown UI for consistency
    const defaultModels = [
      { id: "mistral", name: "Mistral", contextLength: 8192 },
      { id: "openai", name: "OpenAI", contextLength: 4096 },
      { id: "llama", name: "Llama", contextLength: 4096 },
      { id: "deepseek-reasoning", name: "DeepSeek Reasoning", contextLength: 8192 }
    ];
    
    // Store these as our current models for searching
    allOpenRouterModels = defaultModels;
    
    // Display the default models in the custom dropdown
    displayModels(defaultModels);
    
    // Set the selected model text in the button based on current selection
    let currentModel = modelSelect.value;
    let modelName = "Mistral"; // Default
    
    // Find the name for the selected model
    defaultModels.forEach(model => {
      if (model.id === currentModel) {
        modelName = model.name;
      }
    });
    
    // Update the dropdown button text
    if (selectedModelText) {
      selectedModelText.textContent = modelName;
    }
  }
  // Store all fetched models for searching
  let allOpenRouterModels = [];
  
  // Get the custom dropdown elements
  const modelSelectBtn = document.getElementById('model-select-btn');
  const modelDropdown = document.getElementById('model-dropdown');
  const modelOptionsContainer = document.getElementById('model-options-container');
  const selectedModelText = document.getElementById('selected-model-text');
  const modelSearch = document.getElementById('model-search');
    // Setup custom dropdown behavior
  modelSelectBtn.addEventListener('click', function() {
    // Toggle dropdown visibility
    if (modelDropdown.style.display === 'none' || !modelDropdown.style.display) {
      // Show the dropdown
      modelDropdown.style.display = 'block';
      
      // Reset search field
      if (modelSearch) {
        modelSearch.value = '';
      }
      
      // If we have models, display all of them
      if (allOpenRouterModels.length > 0) {
        displayModels(allOpenRouterModels);
      }
      
      // Focus search input when dropdown opens (optional)
      setTimeout(() => modelSearch.focus(), 100);
    } else {
      modelDropdown.style.display = 'none';
    }
  });
  
  // Close dropdown when clicking outside
  document.addEventListener('click', function(event) {
    const isClickInside = modelSelectBtn.contains(event.target) || 
                          modelDropdown.contains(event.target);
                          
    if (!isClickInside && modelDropdown.style.display === 'block') {
      modelDropdown.style.display = 'none';
    }
  });
  
  // Filter models based on search query
  function filterModels(searchQuery) {
    if (!searchQuery || searchQuery.trim() === '') {
      // If search is empty, show all models
      displayModels(allOpenRouterModels);
      return;
    }
    
    searchQuery = searchQuery.toLowerCase();
    
    // Filter models that match the search query in id or name
    const filteredModels = allOpenRouterModels.filter(model => {
      return model.id.toLowerCase().includes(searchQuery) || 
             model.name.toLowerCase().includes(searchQuery);
    });
    
    // Display filtered models
    displayModels(filteredModels);
  }
  
  // Add search event listener
  modelSearch.addEventListener('input', function() {
    filterModels(this.value);
  });
  
  // Select a model from the custom dropdown
  function selectModel(modelId, modelName) {
    // Set the hidden select value for form submission
    modelSelect.value = modelId;
    
    // Update the button text to show selected model
    selectedModelText.textContent = modelName;
    
    // Highlight the selected option
    const options = document.querySelectorAll('.model-option');
    options.forEach(option => {
      if (option.dataset.value === modelId) {
        option.classList.add('selected');
      } else {
        option.classList.remove('selected');
      }
    });
    
    // Close the dropdown
    modelDropdown.style.display = 'none';
  }
  
  // Display models in the custom dropdown
  function displayModels(models) {
    // Clear the options container
    modelOptionsContainer.innerHTML = '';
    
    // Also update the hidden select for form submission
    modelSelect.innerHTML = '';
    
    if (models.length === 0) {
      // No models found
      modelOptionsContainer.innerHTML = '<div class="model-option">No models found</div>';
      return;
    }
    
    // Get currently selected model
    const currentModelId = modelSelect.value;
    
    // Group models by provider
    const modelsByProvider = {};
    
    models.forEach(model => {
      // Extract provider
      const parts = model.id.split('/');
      const provider = parts[0];
      
      if (!modelsByProvider[provider]) {
        modelsByProvider[provider] = [];
      }
      
      modelsByProvider[provider].push(model);
    });
    
    // Add models to dropdown with optgroups for each provider
    Object.keys(modelsByProvider).sort().forEach(provider => {
      // Create optgroup for the hidden select
      const optgroup = document.createElement('optgroup');
      optgroup.label = provider.charAt(0).toUpperCase() + provider.slice(1);
      
      // Create a provider section for the custom dropdown
      const providerDiv = document.createElement('div');
      providerDiv.className = 'model-optgroup';
      
      const providerLabel = document.createElement('div');
      providerLabel.className = 'model-optgroup-label';
      providerLabel.textContent = provider.charAt(0).toUpperCase() + provider.slice(1);
      providerDiv.appendChild(providerLabel);
      
      modelsByProvider[provider]
        .sort((a, b) => a.name.localeCompare(b.name))
        .forEach(model => {
          // Create option for hidden select
          const option = document.createElement('option');
          option.value = model.id;
          option.textContent = `${model.name} (${Math.round(model.contextLength/1000)}k ctx)`;
          optgroup.appendChild(option);
          
          // Create option for custom dropdown
          const modelOption = document.createElement('div');
          modelOption.className = 'model-option';
          if (model.id === currentModelId) {
            modelOption.classList.add('selected');
          }
          modelOption.dataset.value = model.id;
          modelOption.textContent = `${model.name} (${Math.round(model.contextLength/1000)}k ctx)`;
          
          // Add click handler to select this model
          modelOption.addEventListener('click', function() {
            selectModel(model.id, modelOption.textContent);
          });
          
          providerDiv.appendChild(modelOption);
        });
      
      // Add to UI
      modelOptionsContainer.appendChild(providerDiv);
      modelSelect.appendChild(optgroup);
    });
    
    console.log(`VoltArc: Showing ${models.length} models`);
  }
    // Helper function to find model name from ID
  function findModelName(modelId, modelsList) {
    const model = modelsList.find(m => m.id === modelId);
    if (model) {
      return model.name;
    }
    return null;
  }
  
  // Toggle OpenRouter settings visibility based on provider selection
  function toggleOpenRouterSettings() {
    // Hide the custom dropdown if it's open
    if (modelDropdown.style.display === 'block') {
      modelDropdown.style.display = 'none';
    }
    
    if (providerSelect.value === 'openrouter') {
      openrouterSettings.style.display = 'block';
      
      // If API key is set, fetch available models
      const apiKey = openrouterApiKey.value;
      if (apiKey) {
        fetchOpenRouterModels(apiKey);
      } else {
        // Use default models if no API key
        addDefaultModels();
      }
    } else {
      openrouterSettings.style.display = 'none';
      addDefaultModels(); // Reset to default models for Pollinations
      
      // When switching to Pollinations, update the selected model text
      const currentModel = modelSelect.value || 'mistral';
      
      // Find the name for the selected model in default models
      const defaultModels = [
        { id: "mistral", name: "Mistral" },
        { id: "openai", name: "OpenAI" },
        { id: "llama", name: "Llama" },
        { id: "deepseek-reasoning", name: "DeepSeek Reasoning" }
      ];
      
      const model = defaultModels.find(m => m.id === currentModel);
      if (model && selectedModelText) {
        selectedModelText.textContent = model.name;
      } else {
        selectedModelText.textContent = "Mistral"; // Default
        modelSelect.value = "mistral";
      }
    }
  }
  
  // Provider selection change event
  providerSelect.addEventListener('change', toggleOpenRouterSettings);
  
  // API Key input change event
  openrouterApiKey.addEventListener('change', function() {
    if (providerSelect.value === 'openrouter' && openrouterApiKey.value) {
      fetchOpenRouterModels(openrouterApiKey.value);
    }
  });
  
  // Add search functionality
  modelSearch.addEventListener('input', function() {
    filterModels(this.value);
  });
    // Load saved settings or use defaults
  chrome.storage.sync.get(['provider', 'model', 'systemPrompt', 'openrouterApiKey'], function(data) {
    if (data.provider) {
      providerSelect.value = data.provider;
    } else {
      providerSelect.value = 'pollinations';
    }
    
    if (data.openrouterApiKey) {
      openrouterApiKey.value = data.openrouterApiKey;
    }
    
    if (data.systemPrompt) {
      systemPrompt.value = data.systemPrompt;
    } else {
      systemPrompt.value = defaultSystemPrompt;
    }
    
    // Show/hide OpenRouter settings based on saved provider
    toggleOpenRouterSettings();
    
    // After toggle, if we're using OpenRouter and have an API key, load the saved model
    if (data.provider === 'openrouter' && data.openrouterApiKey) {
      // Wait for models to load before setting the selected model
      setTimeout(() => {
        if (data.model) {
          // Check if the option exists
          const options = Array.from(modelSelect.options);
          const modelExists = options.some(option => option.value === data.model);
          
          if (modelExists) {
            modelSelect.value = data.model;
            // Update the custom dropdown UI
            const modelName = findModelName(data.model, allOpenRouterModels);
            if (modelName && selectedModelText) {
              selectedModelText.textContent = modelName;
            }
          }
        }
      }, 1000);
    } else {
      // For Pollinations, we can set the model right away
      if (data.model) {
        modelSelect.value = data.model;
      } else {
        modelSelect.value = 'mistral';
      }
      
      // Make sure the custom dropdown button text is updated for Pollinations
      const defaultModels = [
        { id: "mistral", name: "Mistral" },
        { id: "openai", name: "OpenAI" },
        { id: "llama", name: "Llama" },
        { id: "deepseek-reasoning", name: "DeepSeek Reasoning" }
      ];
      
      const modelId = data.model || 'mistral';
      const model = defaultModels.find(m => m.id === modelId);
      
      if (model && selectedModelText) {
        selectedModelText.textContent = model.name;
      }
    }
  });
  
  // Save settings
  saveSettingsButton.addEventListener('click', function() {
    const provider = providerSelect.value;
    const model = modelSelect.value;
    const prompt = systemPrompt.value || defaultSystemPrompt;
    const apiKey = openrouterApiKey.value;
    
    chrome.storage.sync.set({
      provider: provider,
      model: model,
      systemPrompt: prompt,
      openrouterApiKey: apiKey
    }, function() {
      // Show a saved message
      saveMessage.classList.add('visible');
      setTimeout(() => {
        saveMessage.classList.remove('visible');
      }, 2000);
    });
  });
  
  // Navigate to ChatGPT
  chatGptButton.addEventListener('click', function() {
    chrome.tabs.create({ url: 'https://chat.openai.com/' });
  });
});
