---
layout: null
permalink: /donation/
hide_title: true
---

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1,user-scalable=no">
  <title>贊助</title>

  <link rel="shortcut icon" href="{{ '/assets/favicon.ico' | absolute_url }}">
  <link rel="shortcut icon" href="{{ '/assets/favicon.png' | absolute_url }}">
  <!-- ios meta -->
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <link rel="apple-touch-icon" href="{{ '/assets/favicon.png' | absolute_url }}">
  <!-- android meta -->
  <link rel="icon" type="image/png" sizes="128x128" href="{{ '/assets/favicon.png' | absolute_url }}">

  {% capture styles %}
    {% include style/donation.scss %}
  {% endcapture %}
  <style>{{ styles | scssify }}</style>
</head>

<body>
  {% include donation.html %}
</body>
