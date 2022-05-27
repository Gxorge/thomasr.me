---
layout: default
title: Colophon
permalink: /colophon/
description: Info about this site
---

# The Site
This site is statically generated with [Jekyll](https://jekyllrb.com/) and is built &amp; served by [Vercel](/_logs).  
Find [the source](https://github.com/thomasr.me/thomasr.me) on GitHub.

## Fonts
The largest asset on this site are the fonts.  
[Libre Baskerville](https://fonts.google.com/specimen/Libre+Baskerville) is the serif font used for headings and [Merriweather Sans](https://fonts.google.com/specimen/Merriweather+Sans) is the copy font.

They're sourced from [Google Fonts](https://fonts.google.com/), though are [self-hosted](https://google-webfonts-helper.herokuapp.com/fonts) to ensure that there are no external requests.

## JavaScript
There is a minimal amount of JavaScript used on all pages for the random colours.  
On the homepage, there is some JS used to deobfuscate my email address and display a time-relevant greeting.  
The 404 page contains code to check whether a project has been moved to my GitHub Pages [subdomain](https://github-pages.thomasr.me). 

None of the above JS is required for the site to function; this is not a PWA.

---

### Jekyll Build Information

- Jekyll **{{ jekyll.version }}**, **{{ jekyll.environment }}** 
- Built Started at **{{ site.time | date: '%Y-%m-%d %H:%M' }}**
- **{{ site.pages.size }}** Pages, **{{ site.static_files.size }}** Static Files