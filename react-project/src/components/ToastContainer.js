import { useState, useCallback, useEffect } from 'react';
import Toast from './Toast';
import './ToastContainer.css';

let toastId = 0;
let toastListeners = [];

export const toast = {
  success: (message) => {
    const id = ++toastId;
    toastListeners.forEach(listener => listener({ id, message, type: 'success' }));
    return id;
  },
  error: (message) => {
    const id = ++toastId;
    toastListeners.forEach(listener => listener({ id, message, type: 'error' }));
    return id;
  },
  info: (message) => {
    const id = ++toastId;
    toastListeners.forEach(listener => listener({ id, message, type: 'info' }));
    return id;
  },
};

function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toastData) => {
    setToasts(prev => [...prev, toastData]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  useEffect(() => {
    toastListeners.push(addToast);
    return () => {
      toastListeners = toastListeners.filter(listener => listener !== addToast);
    };
  }, [addToast]);

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}

export default ToastContainer;

