type CookieConsent = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

// Shared consent state. CookiesDialog loads GTM and applies the choice, so
// any number of components can call this without repeating that work.
export function useCookiesDialog() {
  const cookiesDialogRef = useState<DialogComponent | null>(
    'cookiesDialogRef',
    () => null,
  );

  const cookieConsent = useState<CookieConsent>('cookieConsent', () => ({
    necessary: false,
    analytics: false,
    marketing: false,
  }));

  // The choice is remembered for a year
  const consentCookie = useCookie<CookieConsent | null>('cookieConsent', {
    maxAge: 60 * 60 * 24 * 365,
  });

  const hasConsent = computed(
    () => cookieConsent.value?.analytics && cookieConsent.value?.marketing,
  );

  function saveConsent(granted: boolean) {
    const consent = { necessary: true, analytics: granted, marketing: granted };

    consentCookie.value = consent;
    cookieConsent.value = { ...consent };

    cookiesDialogRef.value?.closeDialog();
  }

  function acceptCookies() {
    saveConsent(true);
  }

  function denyCookies() {
    saveConsent(false);
  }

  return {
    cookieConsent,
    consentCookie,
    cookiesDialogRef,
    hasConsent,
    acceptCookies,
    denyCookies,
  };
}
