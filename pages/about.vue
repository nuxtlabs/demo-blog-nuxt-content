<template>
  <div class="m-8">
    <TheHeader />

    <h2 class="font-bold text-2xl mb-2">About</h2>

    <footer class="flex justify-center border-gray-500 border-t-2">
      <p class="mt-4">© {{ new Date().getFullYear() }} Tim Willis</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style>
/** comment */
</style>
