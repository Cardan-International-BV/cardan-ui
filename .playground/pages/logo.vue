<script setup lang="ts">
useHead({ title: 'Logo' });

const variants: CardanLogoVariant[] = ['color', 'purple', 'black'];
const darkVariants: CardanLogoVariant[] = ['negative', 'white'];
</script>

<template>
  <div class="demo-page">
    <h1>Logo</h1>

    <p>
      The <code>{{ `<CardanLogo />` }}</code> component renders the Cardan logo:
      two interlocking links (green and purple) with the wordmark to the right.
      Its colors are fixed brand artwork and never follow the theme tokens. The
      logo has an accessible name ("Cardan", or "Cardan Academy" for a lockup);
      add <code>decorative</code> when a visible name is right next to it.
    </p>

    <Card>
      <h2>Forms</h2>

      <div class="logo-demo-row">
        <figure>
          <CardanLogo />
          <figcaption><code>form="full"</code> (default)</figcaption>
        </figure>
        <figure>
          <CardanLogo form="symbol" />
          <figcaption><code>form="symbol"</code></figcaption>
        </figure>
        <figure>
          <CardanLogo form="tile" height="3rem" />
          <figcaption><code>form="tile"</code></figcaption>
        </figure>
        <figure>
          <CardanLogo form="tile" round height="3rem" />
          <figcaption><code>form="tile" round</code></figcaption>
        </figure>
      </div>

      <p>
        Use the full logo everywhere the library shows a brand logo: headers,
        app shells and footers. The tile is only for favicons, app icons and
        profile images, never in a website header.
      </p>
    </Card>

    <Card>
      <h2>Variants</h2>

      <p>
        The default <code>variant="auto"</code> shows the color logo in light
        mode and the color-negative logo in dark mode.
      </p>

      <div class="logo-demo-row logo-demo-light">
        <figure v-for="variant in variants" :key="variant">
          <CardanLogo :variant="variant" />
          <figcaption>
            <code>variant="{{ variant }}"</code>
          </figcaption>
        </figure>
      </div>

      <div class="logo-demo-row logo-demo-dark">
        <figure v-for="variant in darkVariants" :key="variant">
          <CardanLogo :variant="variant" />
          <figcaption>
            <code>variant="{{ variant }}"</code>
          </figcaption>
        </figure>
      </div>
    </Card>

    <Card>
      <h2>Lockups</h2>

      <p>
        Sub-brands are lockups, not new logos: the product name follows the logo
        in lowercase, in purple.
      </p>

      <div class="logo-demo-row">
        <CardanLogo product="academy" />
        <CardanLogo product="auditor" />
      </div>
    </Card>

    <Card>
      <h2>Usage rules</h2>

      <ul>
        <li>
          Keep clear space around the logo of at least the width of one link.
        </li>
        <li>
          The logo is 20px high by default; set the <code>height</code> prop for
          a larger logo. It shrinks to fit narrow containers, but never below
          the minimum of 18px.
        </li>
        <li>
          Never stretch, recolor or rotate the logo, never put the color logo on
          purple, and never place it on a busy area.
        </li>
        <li>On photos, use the white or black one-color logo only.</li>
      </ul>
    </Card>
  </div>
</template>

<style>
.logo-demo-row {
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  gap: 2rem 3rem;
  margin-block: 1.5rem;

  figure {
    display: grid;
    justify-items: start;
    gap: 0.75rem;
  }

  figcaption {
    font-size: var(--font-size-sm);
    color: var(--color-grey-text);
  }
}

/* The fixed variants are shown on the background they are made for */
.logo-demo-light,
.logo-demo-dark {
  padding: 1.5rem;
  border-radius: var(--radius-lg);
}

.logo-demo-light {
  background-color: var(--cardan-white);
  border: 1px solid var(--cardan-beige-mid);

  figcaption {
    color: var(--cardan-body-grey);
  }

  code {
    color: var(--cardan-body);
    background-color: var(--cardan-beige-sand);
  }
}

.logo-demo-dark {
  background-color: var(--cardan-black);

  figcaption {
    color: var(--cardan-white);
  }

  code {
    color: var(--cardan-black);
    background-color: var(--cardan-beige-sand);
  }
}
</style>
