type CookieConsent = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

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

  const consentTrigger = useScriptTriggerConsent();

  const gtm = useScriptGoogleTagManager({
    id: useRuntimeConfig().public.gtmId as string,

    onBeforeGtmStart: (gtag) => {
      gtag('consent', 'default', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'denied',
        functionality_storage: 'denied',
        personalization_storage: 'denied',
      });
    },

    scriptOptions: {
      trigger: consentTrigger,
    },
  });

  // GTM only reads gtag commands from an Arguments object, not from an array
  function gtag(
    ..._args: [
      command: 'consent',
      type: 'default' | 'update',
      params: Record<string, 'granted' | 'denied'>,
    ]
  ) {
    // eslint-disable-next-line prefer-rest-params
    gtm.proxy.dataLayer.push(arguments as unknown as unknown[]);
  }

  onMounted(() => {
    if (consentCookie.value) {
      cookieConsent.value = { ...consentCookie.value };
    }

    if (
      cookieConsent.value?.necessary === true &&
      cookieConsent.value?.analytics === true &&
      cookieConsent.value?.marketing === true
    ) {
      acceptCookies();
    } else if (
      cookieConsent.value?.necessary === true &&
      cookieConsent.value?.analytics === false &&
      cookieConsent.value?.marketing === false
    ) {
      denyCookies();
    } else {
      cookiesDialogRef.value?.openDialog();
    }
  });

  function acceptCookies() {
    gtag('consent', 'update', {
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      ad_storage: 'granted',
      analytics_storage: 'granted',
      functionality_storage: 'granted',
      personalization_storage: 'granted',
    });

    consentCookie.value = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    cookieConsent.value.necessary = true;
    cookieConsent.value.analytics = true;
    cookieConsent.value.marketing = true;

    consentTrigger.accept();

    cookiesDialogRef.value?.closeDialog();
  }

  function denyCookies() {
    gtag('consent', 'update', {
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      ad_storage: 'denied',
      analytics_storage: 'denied',
      functionality_storage: 'denied',
      personalization_storage: 'denied',
    });

    consentCookie.value = {
      necessary: true,
      analytics: false,
      marketing: false,
    };

    cookieConsent.value.necessary = true;
    cookieConsent.value.analytics = false;
    cookieConsent.value.marketing = false;

    gtm.remove();

    cookiesDialogRef.value?.closeDialog();
  }

  return {
    cookieConsent,
    cookiesDialogRef,
    hasConsent,
    acceptCookies,
    denyCookies,
  };
}
