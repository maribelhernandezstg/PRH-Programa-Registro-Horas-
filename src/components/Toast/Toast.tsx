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
      icon = <BsCheckCircle className="text-white" />;
      break;
    case 'danger':
      icon = <BsXCircle className="text-white" />;
      break;
    case 'info':
      icon = <BsInfoCircle className="text-white" />;
      break;
    case 'warning':
      icon = <BsExclamationCircle className="text-white" />;
      break;
    default:
      icon = <BsInfoCircle className="text-white" />;
      break;
  }

  return (
    <ToastContainer className="toast-container p-3" position="bottom-end" style={{ zIndex: 1050 }}>
      <Toast show={show} onClose={onClose} delay={duration} autohide bg={type} className="m-1">
        <Toast.Header>
          <div className="me-2">{icon}</div>
          <strong className="me-auto">{type.toUpperCase()}</strong>
        </Toast.Header>
        <Toast.Body className="text-white">{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default CustomToast;
