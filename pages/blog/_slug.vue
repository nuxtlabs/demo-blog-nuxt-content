<template>
  <article
    class="flex lg:h-screen w-screen lg:overflow-hidden xs:flex-col lg:flex-row"
  >
    <div class="relative lg:w-1/2 xs:w-full xs:h-84 lg:h-full post-left">
      <img
        :src="article.img"
        :alt="article.alt"
        class="absolute h-full w-full object-cover"
      />
      <div class="overlay"></div>
      <div class="absolute top-32 left-32 text-white">
        <NuxtLink to="/"><Logo /></NuxtLink>
        <div class="mt-16 -mb-3 flex uppercase text-sm">
          <p class="mr-3">
            {{ formatDate(article.updatedAt) }}
          </p>
          <span class="mr-3">•</span>
          <p>{{ article.author.name }}</p>
        </div>
        <h1 class="text-6xl font-bold">{{ article.title }}</h1>
        <span v-for="(tag, id) in article.tags" :key="id">
          <NuxtLink :to="`/blog/tag/${tags[tag].slug}`">
            <span
              class="truncate uppercase tracking-wider font-medium text-ss px-2 py-1 rounded-full mr-2 mb-2 border border-light-border dark:border-dark-border transition-colors duration-300 ease-linear"
            >
              {{ tags[tag].name }}
            </span>
          </NuxtLink>
        </span>
      </div>
      <div class="flex absolute top-3rem right-3rem">
        <NuxtLink
          to="/"
          class="mr-8 self-center text-white font-bold hover:underline"
        >
          All articles
        </NuxtLink>
        <a
          href="https://nuxtjs.org/blog/creating-blog-with-nuxt-content"
          class="mr-8 self-center text-white font-bold hover:underline"
        >
          Tutorial
        </a>
        <AppSearchInput />
      </div>
    </div>
    <div
      class="relative xs:py-8 xs:px-8 lg:py-32 lg:px-16 lg:w-1/2 xs:w-full h-full overflow-y-scroll markdown-body post-right custom-scroll"
    >
      <h1 class="font-bold text-4xl">{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <p class="pb-4">Post last updated: {{ formatDate(article.updatedAt) }}</p>
      <!-- table of contents -->
      <nav class="pb-6">
        <ul>
          <li
            v-for="link of article.toc"
            :key="link.id"
            :class="{
              'font-semibold': link.depth === 2
            }"
          >
            <nuxtLink
              :to="`#${link.id}`"
              class="hover:underline"
              :class="{
                'py-2': link.depth === 2,
                'ml-2 pb-2': link.depth === 3
              }"
              >{{ link.text }}</nuxtLink
            >
          </li>
        </ul>
      </nav>
      <!-- content from markdown -->
      <nuxt-content :document="article" />
      <!-- content author component -->
      <author :author="article.author" />
      <!-- prevNext component -->
      <PrevNext :prev="prev" :next="next" class="mt-8" />
    </div>
  </article>
</template>
<script>
export default {
  async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()
    const tagsList = await $content('tags')
      .only(['name', 'slug'])
      .where({ name: { $containsAny: article.tags } })
      .fetch()
    const tags = Object.assign({}, ...tagsList.map((s) => ({ [s.name]: s })))
    const [prev, next] = await $content('articles')
      .only(['title', 'slug'])
      .sortBy('createdAt', 'asc')
      .surround(params.slug)
      .fetch()
    return {
      article,
      tags,
      prev,
      next
    }
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    }
  }
}
</script>
<style>
.nuxt-content p {
  margin-bottom: 20px;
}
.nuxt-content h2 {
  font-weight: bold;
  font-size: 28px;
}
.nuxt-content h3 {
  font-weight: bold;
  font-size: 22px;
}
.icon.icon-link {
  background-image: url('~assets/svg/icon-hashtag.svg');
  display: inline-block;
  width: 20px;
  height: 20px;
  background-size: 20px 20px;
}
</style>
