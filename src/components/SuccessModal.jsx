import React from 'react';
import 'styles/success-modal.scss';

const SuccessModal = ({ onClose }) => (
  <div className="modal">
    <div className="modalContent successContent">
      <h3>All done!</h3>
      <div className="titleLine"></div>
      <p>You will be one of the first to experience Broccoli & Co.</p>
      <button onClick={onClose}>OK</button>
    </div>
  </div>
);

export default SuccessModal;
