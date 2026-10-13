<script setup lang="ts">
useHead({ title: 'Auth UI' });
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
      <MfaDemo />
    </Card>

    <Card>
      <h2>Forms</h2>

      <ul>
        <li><NuxtLink to="/auth/login">Login form</NuxtLink></li>
        <li><NuxtLink to="/auth/setup">Inline MFA setup</NuxtLink></li>
        <li>
          <NuxtLink to="/two-factor-authentication">
            Sign-in challenge
          </NuxtLink>
        </li>
      </ul>
    </Card>
  </div>
</template>
