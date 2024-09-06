import React, { useState } from 'react';
import { FiSend, FiPaperclip } from 'react-icons/fi';
import './ChatInput.css';

const ChatInput = () => {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [chat, setChat] = useState([]);

  const handleSend = () => {
    if (message || file) {
      const newMessage = { text: message, file };
      setChat([...chat, newMessage]);
      setMessage('');
      setFile(null);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {chat.map((msg, index) => (
          <div key={index} className="chat-message">
            <div className="message-text">{msg.text}</div>
            {msg.file && <div className="message-file">{msg.file.name}</div>}
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
