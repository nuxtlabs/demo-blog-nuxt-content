<template>
  <main class="main">
    <template v-if="error.statusCode === 404">
      <h1 class="title mb-2">Page Not Found</h1>
      <h2 class="subtitle">404</h2>
      <p class="mb-4">
        Looks like you've followed a broken link2 or entered a URL that doesn't
        exist on this site.
      </p>
    </template>
    <template v-else>
      <h1 class="title">An error occurred</h1>
      <p class="mb-4">
        Looks like you've followed a broken link2 or entered a URL that doesn't
        exist on this site.
      </p>
    </template>
    <nuxt-link to="/">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        class="inline fill-current"
      >
        <path
          d="M11.9998836,4.09370803 L8.55809517,7.43294953 C8.23531459,7.74611298 8.23531459,8.25388736 8.55809517,8.56693769 L12,11.9062921 L9.84187871,14 L4.24208544,8.56693751 C3.91930485,8.25388719 3.91930485,7.74611281 4.24208544,7.43294936 L9.84199531,2 L11.9998836,4.09370803 Z"
        ></path>
      </svg>
      Go back
    </nuxt-link>
  </main>
</template>

<script>
export default {
  name: 'Error',
  props: ['error']
}
</script>
