import React, { useState } from 'react';
import { FiSend, FiPaperclip } from 'react-icons/fi';
import './ChatInput.css';

const ChatInput = () => {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [chat, setChat] = useState([]);

  const handleSend = async () => {
    if (message || file) {
      // Create a FormData object to send text and file together
      const formData = new FormData();
      formData.append('text', message);
      if (file) {
        formData.append('file', file);
      }
  
      try {
        const response = await fetch('http://localhost:8000/generate', {
          method: 'POST',
          body: JSON.stringify({ user_input: message }), // Adjust based on your API
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        const data = await response.text(); 
  
        if (response.ok) {
          const newMessage = { text: message, file: file ? file.name : null, isUser: true };
          const aiResponse = { text: data, file: null, isUser: false };
          setChat([...chat, newMessage, aiResponse]);
          setMessage('');
          setFile(null);
        } else {
          console.error('Error:', data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {chat.map((msg, index) => (
          <div 
            key={index} 
            className={`chat-message ${msg.isUser ? 'user-message' : 'ai-message'}`}
          >
            <div className="message-text">{msg.text}</div>
            {msg.file && <div className="message-file">{msg.file}</div>}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="text-input"
        />
        <label htmlFor="file-upload" className="file-input-label">
          <FiPaperclip size={20} />
        </label>
        <input
          id="file-upload"
          type="file"
          onChange={handleFileChange}
          className="file-input"
        />
        <button onClick={handleSend} className="send-button">
          <FiSend size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
