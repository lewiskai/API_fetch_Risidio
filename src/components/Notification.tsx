import React from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  const backgroundColor = type === 'success' ? 'bg-success' : 'bg-danger';

  return (
    <div className={`toast show ${backgroundColor} text-white`} role="alert" aria-live="assertive" aria-atomic="true">
      <div className="toast-header">
        <strong className="me-auto">{type === 'success' ? 'Success' : 'Error'}</strong>
        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
      </div>
      <div className="toast-body">
        {message}
      </div>
    </div>
  );
};

export default Notification;