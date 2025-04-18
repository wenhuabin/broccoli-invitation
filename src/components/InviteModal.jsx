import React, { useState } from 'react';

const InviteModal = ({ onClose, onSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    if (name.length < 3) return 'Name must be at least 3 characters.';
    if (!email.includes('@')) return 'Invalid email format.';
    if (email !== confirm) return 'Emails do not match.';
    return null;
  };

  const handleSubmit = async () => {
    const validation = validate();
    if (validation) return setError(validation);

    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch('https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });

      if (res.ok) {
        onSuccess();
      } else {
        const { errorMessage } = await res.json();
        setError(errorMessage);
      }
    } catch (err) {
      setError('Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal">
      <div className="modalContent">
        <h3>Request an invite</h3>
        <input placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Confirm Email" value={confirm} onChange={e => setConfirm(e.target.value)} />
        {error && <p className="error">{error}</p>}
        <button onClick={handleSubmit} disabled={submitting}>Send</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default InviteModal;
