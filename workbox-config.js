module.exports = {
  "globDirectory": "build/",
  "globPatterns": [
    "**/*.{jpg,png,jpeg,svg,html,js,css,eot,ttf,woff,woff2,otf}"
  ],
  "swSrc": "src/sw.js",
  "swDest": "build/sw.js",
  "globIgnores": [
    "../workbox-config.js"
  ]
};