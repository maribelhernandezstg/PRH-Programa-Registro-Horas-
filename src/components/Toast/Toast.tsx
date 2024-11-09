import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { BsCheckCircle, BsExclamationCircle, BsInfoCircle, BsXCircle } from 'react-icons/bs';

interface CustomToastProps {
  show: boolean;
  message: string;
  type: 'success' | 'danger' | 'info' | 'warning';
  duration: number;
  onClose: () => void;
}

const CustomToast: React.FC<CustomToastProps> = ({ show, message, type, duration, onClose }) => {
  let icon: JSX.Element;
  switch (type) {
    case 'success':
      icon = <BsCheckCircle className="text-dark" />;
      break;
    case 'danger':
      icon = <BsXCircle className="text-dark" />;
      break;
    case 'info':
      icon = <BsInfoCircle className="text-dark" />;
      break;
    case 'warning':
      icon = <BsExclamationCircle className="text-dark" />;
      break;
    default:
      icon = <BsInfoCircle className="text-dark" />;
      break;
  }

  return (
    <ToastContainer className="toast-container p-3" position="bottom-end" style={{ zIndex: 1050 }}>
      <Toast show={show} onClose={onClose} delay={duration} autohide bg={type} className="m-1">
        <Toast.Header>
          <div className="me-2">{icon}</div>
          <strong className="me-auto">{type.toUpperCase()}</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default CustomToast;
