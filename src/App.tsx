import React, { useState } from 'react';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import Notification from './components/Notification';
import './App.css';

export interface NotificationState {
  message: string;
  type: 'success' | 'error';
}

function App() {
  const [notification, setNotification] = useState<NotificationState | null>(null);

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="App app-container">
      <h1 className="text-center app-title">Post Management</h1>
      <div className="notification-container">
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}
      </div>
      <div className="card mb-4">
        <div className="card-body">
          <PostForm onNotification={showNotification} />
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <PostList onNotification={showNotification} />
        </div>
      </div>
    </div>
  );
}

export default App;