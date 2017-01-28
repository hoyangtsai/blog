---
layout: page
permalink: /cv/
title: Curriculum Vitae
category: base
published: true
description: "Curriculum Vitae / Resume"
tags: ["cv", "resume"]
comments: false
imagesummary: foo.png
modified: "2016-01-03"
sitemap:
    priority: 0.7
    changefreq: 'monthly'
    lastmod: 2017-01-28
style: |
  .container {
        max-width: 48rem;
    }
---

<div class="social-icons">
  <a href="https://twitter.com/share?text=Curriculum Vitae - {{ site.owner.name }}&amp;url={{ site.url }}/cv&amp;via={{ site.owner.twitter }}"  class="social-icons" target="_blank" title="Share on twitter"><i class="fa fa-twitter meta"></i></a>
  <a href="https://plus.google.com/share?url={{ site.url }}/cv"  class="social-icons" target="_blank" title="Share on Google+"> <i class="fa fa-google-plus"></i></a>
  <a href="{{ site.owner.linkedin }}" class="social-icons" title="LinkedIn profile"><i class="fa fa-linkedin"></i></a><a href="{{ site.url }}/files/Resume.pdf" class="social-icons" title="Printer friendly format"><i class="fa fa-print"></i></a>
</div>

<!-- Alternaetly, user html5 embed tag -->
<iframe src="{{ site.url }}/files/Resume.pdf" width="100%" style="height: 100vh;"></iframe>
