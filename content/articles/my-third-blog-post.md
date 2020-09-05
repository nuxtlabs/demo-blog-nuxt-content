---
title: My Third Blog Post
description: Learning how to use @nuxt/content to create a blog
img: https://images.unsplash.com/photo-1588010986054-727675e6f36a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60
alt: my third blog post
author: 
  name: Alexandra
  bio: All about Alexandra and where she works and what she does
  img: https://images.unsplash.com/photo-1506956191951-7a88da4435e5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60
tags: 
  - javascript
  - web development
---

## Welcome to my third blog post using content module

## This is a heading
This is some more info
<div class="bg-blue-500 text-white p-4 mb-4">
  This is HTML inside markdown that has a class some classes
</div>

<info-box>
  <template #info-box>
    This is a vue component inside markdown using slots
  </template>
</info-box>

```js[nuxt.config.js]
export default {
  nuxt: "is the best"
}
```
```html[my-first-blog-post.md]
<p>code styling is easy</p>
```

### This is a sub heading
This is some more info

### This is another sub heading
This is some more info

## This is another heading
This is some more info
