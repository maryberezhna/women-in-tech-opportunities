'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

// Replace PAYPAL_CLIENT_ID and HOSTED_BUTTON_ID with real values when the
// PayPal account is set up. Until then the SDK fails to render and the page
// still works — the button simply does not appear.
const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '';
const HOSTED_BUTTON_ID = process.env.NEXT_PUBLIC_PAYPAL_HOSTED_BUTTON_ID || '';
const SDK_SRC = PAYPAL_CLIENT_ID
  ? `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&components=hosted-buttons&disable-funding=venmo&currency=EUR`
  : '';

export default function PayPalButton() {
  const renderedRef = useRef(false);

  const tryRender = () => {
    if (renderedRef.current) return;
    if (typeof window === 'undefined' || !window.paypal?.HostedButtons) return;
    if (!HOSTED_BUTTON_ID) return;
    renderedRef.current = true;
    window.paypal
      .HostedButtons({ hostedButtonId: HOSTED_BUTTON_ID })
      .render(`#paypal-container-${HOSTED_BUTTON_ID}`);
    if (window.gtag) window.gtag('event', 'paypal_button_render');
  };

  useEffect(() => {
    tryRender();
  }, []);

  if (!SDK_SRC || !HOSTED_BUTTON_ID) {
    return (
      <p style={{ fontSize: 13, color: 'var(--ink-muted)', fontStyle: 'italic' }}>
        PayPal button coming soon — set NEXT_PUBLIC_PAYPAL_CLIENT_ID and
        NEXT_PUBLIC_PAYPAL_HOSTED_BUTTON_ID to activate.
      </p>
    );
  }

  return (
    <>
      <Script src={SDK_SRC} strategy="afterInteractive" onLoad={tryRender} />
      <div id={`paypal-container-${HOSTED_BUTTON_ID}`} className="paypal-container" />
    </>
  );
}
