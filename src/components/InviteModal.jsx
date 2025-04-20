import React, { useState } from 'react';
import 'styles/invite-modal.scss';

const InviteModal = ({ onClose, onSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [invalidFiled, setInvalidFiled] = useState(-1);

  const validate = () => {
    if (name.length < 3) return {field: 0, msg: 'Name must be at least 3 characters.'};
    if (! /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return {field: 1, msg: 'Invalid email format.'};
    if (email !== confirm) return {field: 2, msg: 'Emails do not match.'};
    return null;
  };

  const handleSubmit = async () => {
    const validation = validate();
    if (validation) {
        setInvalidFiled(validation.field);
        setError(validation.msg);
        return;
    }

    setInvalidFiled(-1);
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
        <div className="titleLine"></div>
        <input className={invalidFiled == 0 ? "invalidFiled" : ""} placeholder="Full Name" value={name} onChange={e => setName(e.target.value)}/>
        <input className={invalidFiled == 1 ? "invalidFiled" : ""} placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className={invalidFiled == 2 ? "invalidFiled" : ""} placeholder="Confirm Email" value={confirm} onChange={e => setConfirm(e.target.value)} />
        <button onClick={handleSubmit} disabled={submitting}>Send</button>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );

  //<button onClick={onClose}>Cancel</button>

};

export default InviteModal;
