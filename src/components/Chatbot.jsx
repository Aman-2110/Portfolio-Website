import React, { useState, useRef, useEffect } from 'react';
import { SparklesIcon, XIcon, SendIcon, LoadingIcon } from './icons';

/**
 * Fetches from an API with exponential backoff.
 * @param {string} apiUrl The API endpoint.
 * @param {object} options The request options (method, headers, body).
 * @param {number} maxRetries Maximum number of retries.
 * @returns {Promise<object>} The JSON response.
 */
async function fetchWithRetry(apiUrl, options, maxRetries = 5) {
  let delay = 1000; // 1 second
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(apiUrl, options);

      if (!response.ok) {
        // Don't retry on bad requests, but do on server errors
        if (response.status >= 400 && response.status < 500) {
          // Special check for 401 Unauthorized - likely bad API key
          if (response.status === 401) {
             throw new Error(`Authentication error: ${response.status} ${response.statusText}. Please check your API key.`);
          }
          throw new Error(`Client error: ${response.status} ${response.statusText}`);
        }
        // Otherwise, it's a server error, so retry
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

      return await response.json();

    } catch (error) {
      if (i === maxRetries - 1) throw error; // Last retry failed
      // Wait and retry
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2; // Exponential backoff
    }
  }
}

export const ChatbotFAB = ({ onClick }) => (
  <button
    onClick={onClick}
    className="fixed bottom-8 right-8 bg-cyan-500 text-black p-4 rounded-full shadow-lg hover:bg-cyan-400 transition-all duration-300 z-[9990] flex items-center gap-2"
    data-interactive
  >
    <SparklesIcon className="w-6 h-6" />
    <span className="hidden sm:inline font-semibold">Ask my AI</span>
  </button>
);

/**
 * The Chatbot Modal window.
 */
export const ChatbotModal = ({ isOpen, onClose, portfolioContext }) => {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "Hello! I'm Aman's AI assistant. Ask me any questions about his experience or projects." }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  
  
  const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || 'PASTE_YOUR_OPENAI_API_KEY_HERE';
  // Scroll to bottom when new messages appear
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300); // Wait for transition
    }
  }, [isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const userMessage = inputValue.trim();
    if (!userMessage || isLoading) return;
    
    // Check if API key is set
    if (OPENAI_API_KEY === "PASTE_YOUR_OPENAI_API_KEY_HERE") {
      setMessages(prev => [...prev, { sender: 'ai', text: "The OpenAI API key is not set up. Please add the key in the code to enable the chatbot." }]);
      return;
    }

    // Add user message to chat
    setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setInputValue('');
    setIsLoading(true);

    // Prepare API call for OpenAI
    const apiUrl = "https://api.openai.com/v1/chat/completions";

    const systemPrompt = `You are a helpful and professional AI assistant for Aman Motwani's personal portfolio. Your name is 'Aman's AI'.
You MUST answer questions based ONLY on the provided context.
Do NOT make up information or answer questions outside of the context.
Be friendly and concise. If the answer is not in the context, politely say 'I don't have that specific information based on the portfolio, but you can reach out to Aman directly at amanmotwani0021@gmail.com.'`;

    // If a portfolioContext is provided (string or object), include it as an additional system message
    // so the model can reference the portfolio data when answering. If the context is an object,
    // stringify it safely and truncate to avoid sending extremely large payloads.
    // const serializeContext = (ctx) => {
    //   if (!ctx) return null;
    //   let text = typeof ctx === 'string' ? ctx : (() => {
    //     try {
    //       return JSON.stringify(ctx);
    //     } catch (e) {
    //       return String(ctx);
    //     }
    //   })();
    //   // Truncate if too long (keep first 4000 chars)
    //   if (text.length > 4000) text = text.slice(0, 4000) + '\n\n[TRUNCATED]';
    //   return text;
    // };

    // const contextText = serializeContext(portfolioContext);

    // Construct the chat history for the API. Start with the main system prompt, then
    // optionally include the portfolio context as another system message so it's prioritized.
    const apiMessages = [
      { role: "system", content: systemPrompt },
      ...(portfolioContext ? [{ role: 'system', content: `Portfolio context (use this to answer user queries):\n${portfolioContext}` }] : []),
      // Add previous messages (simplified)
      ...messages.slice(1).map(msg => ({ // skip the first greeting
        role: msg.sender === 'ai' ? 'assistant' : 'user',
        content: msg.text
      })),
      { role: "user", content: userMessage }
    ];

    const payload = {
      model: "gpt-4.1-mini",
      temperature: 0.3,
      messages: apiMessages,
    };
    
    const options = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify(payload)
    };

    try {
      const result = await fetchWithRetry(apiUrl, options);
      const aiResponse = result.choices?.[0]?.message?.content;

      if (aiResponse) {
        setMessages(prev => [...prev, { sender: 'ai', text: aiResponse }]);
      } else {
        throw new Error("Invalid response from API");
      }
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      let errorMessage = "Sorry, I'm having trouble connecting right now. Please try again later.";
      if (error.message.includes("Authentication error")) {
        errorMessage = "There's an issue with the API key. Please double-check it.";
      }
      setMessages(prev => [...prev, { sender: 'ai', text: errorMessage }]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-gray-900 text-white rounded-lg shadow-2xl w-[90vw] max-w-lg h-[70vh] flex flex-col overflow-hidden border border-gray-700"
        onClick={e => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <SparklesIcon className="w-5 h-5 text-cyan-400" />
            Chat with Aman's AI
          </h3>
          <button onClick={onClose} data-interactive>
            <XIcon className="w-6 h-6 text-gray-500 hover:text-white" />
          </button>
        </div>

        {/* Message History */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.sender === 'user'
                    ? 'bg-cyan-600 text-white rounded-br-none'
                    : 'bg-gray-800 text-gray-200 rounded-bl-none'
                }`}
              >
                {/* Simple markdown for newlines */}
                {msg.text.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] p-3 rounded-lg bg-gray-800 text-gray-200 rounded-bl-none">
                <LoadingIcon className="w-5 h-5" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="Ask about my experience..."
              disabled={isLoading}
              className="flex-1 bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-cyan-500 text-black p-2.5 rounded-md hover:bg-cyan-400 transition-all duration-200 disabled:bg-gray-600"
              data-interactive
            >
              <SendIcon className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};