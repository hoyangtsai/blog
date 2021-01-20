---
layout: page
title: Archive
description: "Archive"
category: base
permalink: /archive/
---

<section id="archive">
  ### The latest posts
  {%for post in site.posts %}
    {% unless post.next %}
      <ul class="post-list">
    {% else %}
      {% capture year %}{{ post.date | date: '%Y' }}{% endcapture %}
      {% capture nyear %}{{ post.next.date | date: '%Y' }}{% endcapture %}
      {% if year != nyear %}
        </ul>
        ### {{ post.date | date: '%Y' }}
        <ul class="post-list">
      {% endif %}
    {% endunless %}
      <li>
        <a href="{{ post.url | prepend: site.baseurl }}"
          >{{ post.title }}
          <span class="entry-date">
            <time datetime="{{ post.date | date_to_xmlschema }}"
              >{{ post.date | date: "%b %d, %Y" }}
            </time>
          </span>
        </a>
      </li>
  {% endfor %}
  </ul>
</section>
