#!/usr/bin/env node
const { src, dest, series, parallel } = require('gulp')
const transform = require('gulp-transform')
const rename = require('gulp-rename')

import { render } from './renderer'

function defaultPageWrapper(content: string, filePath: string): string {
  return `
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.3.2/styles/default.min.css" />
<style>
.hljs {
  background-color: transparent;
}
</style>
<script src="//cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
<script>mermaid.initialize({startOnLoad:true});</script>
${content}
  `
}

const pageWrapper = defaultPageWrapper

function renderMd(content: string, file: string) {
  return pageWrapper(render(content).html.trimLeft(), file)
}

function md() {
  return src(['./**/*.md', '!dist/**/*', "!node_modules/**/*"])
    .pipe(transform('utf8', renderMd))
    .pipe(rename({ extname: ".html" }))
    .pipe(dest('dist'))
}

series(md)()
