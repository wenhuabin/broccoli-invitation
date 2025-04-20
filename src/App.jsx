import React, { useState } from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Home from 'components/Home';
import InviteModal from 'components/InviteModal';
import SuccessModal from 'components/SuccessModal';
import 'styles/app.scss';

const App = () => {
  const [showInvite, setShowInvite] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <>
      <Header />
      <div className="main-content">
        <Home onRequest={() => setShowInvite(true)} />
      </div>
      <Footer />
      {showInvite && (
        <InviteModal
          onClose={() => setShowInvite(false)}
          onSuccess={() => {
            setShowInvite(false);
            setShowSuccess(true);
          }}
        />
      )}
      {showSuccess && <SuccessModal onClose={() => setShowSuccess(false)} />}
    </>
  );
};

export default App;
