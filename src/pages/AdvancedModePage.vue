
<template>
  <div class="advanced-iframe-wrapper">
    <iframe 
      :src="iframeSrc"
      class="advanced-iframe"
      frameborder="0"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script setup>
const base = import.meta.env.BASE_URL || '/scalealpha/'
const iframeSrc = `${base}high/index.html`
</script>

<style scoped>
.advanced-iframe-wrapper {
  width: 100%;
  height: calc(100vh - 64px);
  overflow: hidden;
}

.advanced-iframe {
  width: 100%;
  height: 100%;
  border: none;
}
</style>
