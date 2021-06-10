---
title: Optimizing Nuxt Vuetify
description: Let's talk through a few quick modifications we can make to help speed up Vuetify when used with Nuxt.
img: https://live.staticflickr.com/8125/8687584648_fe73414856_c_d.jpg
alt: Improving Nuxt Vuetify's out of the box Lighthouse score
author: 
  name: Tim
  bio: A software engineer currently working at Whitepages, Tim enjoys cycling in his free time and hiking in the cascade foothills.
  img: https://live.staticflickr.com/8544/8687603604_362b42e6b2_c_d.jpg
tags: 
  - nuxtjs
  - vuetify
  - javascript
---

Vuetify is a great component library, but out of the box, its Lighthouse Performance is fairly abysmal.

## Removing Default Assets

The first step will be to completely remove the default font (Roboto) and icon set (Material Design Icons) from our project. We'll add them back shortly in in smarter, more performant ways. Edit your `nuxt.config.js` file's `vuetify` configuration and add the following lines:

```js
vuetify: {
    defaultAssets: {
        font: false,
        icons: false,
    }
}
```

The Roboto and Material Design Icons tags will no longer appear in our projects' head. 

## Google Fonts

Being a material design framework, Vuetify by default uses Google fonts and let's be honest, at this point who _doesn't_ use Google fonts. You'll notice that Nuxt-Vuetify simply does the easiest thing here, which is insert a `<link>` tag into the head of the page. This means our font will be a render-blocking resource.

```html
<link data-n-head="ssr" rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900&amp;display=swap">
```

### Nuxt Webfontloader

We make do one better by using [nuxt-webfontloader](https://github.com/Developmint/nuxt-webfontloader).

```bash
npm install nuxt-webfontloader
```

Then add `'nuxt-webfontloader'` to your nuxt.config.js file, along with the `webfontloader` key:

```js
modules: [
    'nuxt-webfontloader',
],
webfontloader: {
    google: {
        families: ['Roboto:100,300,400,500,700,900&display=swap'] //Loads Roboto in all weights.
    }
},
```

Now you can see that the font has been included, it is no longer included in the ssr response:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900&amp;display=swap" media="all">
```

### Font Weights

At this point, it would be good to consider whether you actually _need_ all six `font-weights` that Vuetify comes with by default. Most projects might be able to get by with `300`, `400` & `700`. Fonts are a costly resource and since variable weight fonts haven't quite made the big-time yet, think carefully about only including what you need.

## Material Design Icons

Similarly to Google Fonts, Vuetify does the easy thing here as well, simply including the _entire_ Material Design Iconfont:

```html
<link data-n-head="ssr" rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css">
```

While convenient, this is approximately ~40kb of render-blocking CSS and we can do better. It also has the unintended consequence of displaying the icon's name before the font itself has loaded. Instead of including the entire font, let's only include what we need.

First, we'll install `@mdi/js`

```bash
npm install @mdi/js
```

Second, we'll let Vuetify know that we are using the `mdiSvg` icons. This is so that components that use icons by default can know where to get them from.

```js
vuetify: {
    defaultAssets: {
        font: false,
        icons: {
            iconfont: 'mdiSvg'
        },
    }
}
```

Then, wherever you are using `<v-icon>` component, you'll want to replace it with the following pattern:

```vue
<template>
    ...
    <v-icon>{{ mdiRepeat }}</v-icon>
    ...
</template>
<script>
    import { mdiRepeat } from '@mdi/js'
    export default {
        data() { 
            return {
                mdiRepeat
            }
        }
    } 
</script>
```

Don't forget that not all Material Design Icons are used within the `v-icon` component. Others are used as a `prop` in components like `v-combobox`.

If you take a look at your project's `<head>`, you'll notice that the `materialdesignicons.min.css` file is no longer included. The icons will instead be bundled into your app's vendors.js file and include only what you use.

With a few easy steps, we've maintained the existing functionality of the framework but significantly increased the way in which it brings in external assets.
