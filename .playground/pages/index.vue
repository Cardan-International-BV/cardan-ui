<script setup lang="ts">
import readme from '~/../README.md?raw';

useHead({ title: 'Getting Started' });
</script>

<template>
  <div class="demo-page getting-started-page">
    <MarkdownPreview :content="readme" font-size="lg" />
  </div>
</template>
