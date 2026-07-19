import { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('friendzy-cookie-consent');
    if (!consent) setShow(true);
  }, []);

  const accept = () => {
    localStorage.setItem('friendzy-cookie-consent', 'accepted');
    setShow(false);
  };

  const decline = () => {
    localStorage.setItem('friendzy-cookie-consent', 'declined');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-ink text-white rounded-2xl p-5 md:p-6 shadow-2xl flex flex-col md:flex-row items-start md:items-center gap-4">
        <Cookie size={24} className="text-amber flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-medium mb-1">We use cookies to improve your experience</p>
          <p className="text-xs text-white/50">
            Essential cookies are required for the site to function. Optional cookies help us understand usage and improve features.
          </p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <button onClick={decline} className="px-4 py-2 rounded-xl bg-white/10 text-white/70 text-xs font-medium hover:bg-white/20 transition-colors cursor-pointer">
            Decline
          </button>
          <button onClick={accept} className="px-4 py-2 rounded-xl bg-amber text-white text-xs font-semibold hover:bg-amber-light transition-colors cursor-pointer">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
