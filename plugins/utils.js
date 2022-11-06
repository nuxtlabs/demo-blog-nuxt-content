function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(date).toLocaleDateString('en', options)
}

export default (context, inject) => {
  // Inject $formatDate(msg) in Vue, context and store.
  inject('formatDate', formatDate)
}
