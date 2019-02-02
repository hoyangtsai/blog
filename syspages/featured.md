---
layout: page
title: Featured Posts
description: "Featured posts"
permalink: /featured/
sitemap: false
noindex: true
category: base
---
<hr class="gh">
<div class="posts">
  {% for post in site.categories.featured %}
  <div class="post">
    <h1 class="post-title">
      <a href="{{ site.url }}{{ post.url }}">
        {{ post.title }}
      </a>
    </h1>

  {% if post.modified.size > 2 %}
    <div class="post-date" itemprop="dateModified" content="{{ post.modified | date: "%Y-%m-%d" }}">
      <i class="far fa-edit" title="Last updated"> {{ post.modified | date_to_string }}</i>
    </div>
    {% else %}
    <div class="post-date" itemprop="datePublished" content="{{ post.date | date: "%Y-%m-%d" }}">
      <i class="fal fa-calendar-alt" title="Date published"></i>&nbsp;{{ post.date | date_to_string }}
    </div>
  {% endif %}

  {% if post.description.size > 140 %}
    {{ post.description | markdownify | remove: '<p>' | remove: '</p>' }}
    {% else %}
    {{ post.excerpt | markdownify | remove: '<p>' | remove: '</p>' }}
  {% endif %}
  <a href="{{ site.url }}{{ post.url }}" title="Read more"><strong>Read more...</strong></a>
  </div>
  {% unless forloop.last %}<hr class="transp">{% endunless %}
  {% endfor %}
</div>
