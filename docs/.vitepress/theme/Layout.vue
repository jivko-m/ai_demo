<template>
  <div class="content">
    <Content />
  </div>
</template>

<script setup>
// This is a minimal layout that only renders the content
// No navigation, no sidebar, no footer
</script>

<style>
.content {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

/* Hide any VitePress UI elements that might be rendered */
.VPNav, .VPSidebar, .VPFooter, .VPDocFooter {
  display: none !important;
}

/* Ensure content takes full width */
.VPContent {
  padding: 0 !important;
}
</style>
