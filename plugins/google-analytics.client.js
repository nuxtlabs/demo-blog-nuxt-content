import Vue from 'vue'
import VueGtag from 'vue-gtag'

// Todo: enable GDPR https://www.carlcassar.com/articles/add-google-analytics-to-a-nuxt-js-app/
export default ({ app }) => {
  Vue.use(
    VueGtag,
    {
      config: { id: 'G-LW1E8NZE34' },
      appName: 'BN_SPACE',
      pageTrackerScreenviewEnabled: true,
      // onReady: () => console.log('raady'),
      // onError: () => console.log('onError'),
      // onAfterTrack: () => console.log('onAfterTrack'),
    },
    app.router,
  )
}
