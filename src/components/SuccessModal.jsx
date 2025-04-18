import React from 'react';

const SuccessModal = ({ onClose }) => (
  <div className="modal">
    <div className="modalContent">
      <h3>All done!</h3>
      <p>You will be one of the first to experience Broccoli & Co.</p>
      <button onClick={onClose}>OK</button>
    </div>
  </div>
);

export default SuccessModal;
