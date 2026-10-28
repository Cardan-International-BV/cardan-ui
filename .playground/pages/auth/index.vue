<script setup lang="ts">
useHead({ title: 'Auth UI' });

// The layer reads its config when a component is set up, so the demo is
// mounted again (by key) when the switch changes it.
const cardanAuth = useCardanAuthConfig();
const onlyAtSetup = ref(cardanAuth.recoveryCodesOnlyAtSetup);

watch(onlyAtSetup, (value) => {
  cardanAuth.recoveryCodesOnlyAtSetup = value;
});
</script>

<template>
  <div class="demo-page">
    <h1>Auth UI</h1>

    <p>
      Cardan Auth UI is a separate layer in the <code>auth/</code> directory,
      with the sign-in and MFA forms for apps backed by Laravel Fortify.
      Projects extend it next to Cardan UI; see <code>auth/README.md</code>. The
      pages below talk to mock Fortify endpoints of this playground.
    </p>

    <Card>
      <h2>MFA dialogs</h2>

      <p>
        With <code>recoveryCodesOnlyAtSetup</code> on, as on the Cardan Academy
        API, the recovery codes are shown only when they are created: the setup
        says so, and the recovery codes dialog asks to replace them and shows
        the new set once. Off, it shows the current codes, as Fortify does. The
        switch also applies to the MFA setup page below.
      </p>

      <Switch
        v-model="onlyAtSetup"
        label="recoveryCodesOnlyAtSetup"
        variant="outline"
      />

      <MfaDemo :key="String(onlyAtSetup)" />
    </Card>

    <Card>
      <h2>Pages</h2>

      <p>
        The layer's own pages, as an app gets them. Any password signs in and
        continues to the sign-in challenge, except <code>wrong</code>, which
        shows the error; the reset token <code>wrong</code> does the same.
      </p>

      <ul>
        <li><NuxtLink to="/login">Login</NuxtLink></li>
        <li><NuxtLink to="/forgot-password">Forgot password</NuxtLink></li>
        <li>
          <NuxtLink
            :to="{
              path: '/reset-password',
              query: { token: 'demo', email: 'demo@example.com' },
            }"
          >
            Reset password
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/two-factor-authentication">
            Sign-in challenge
          </NuxtLink>
        </li>
        <li><NuxtLink to="/mfa-setup">MFA setup</NuxtLink></li>
      </ul>
    </Card>
  </div>
</template>
