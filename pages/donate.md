---
title: Donation
permalink: /donate/
published: true
comments: false
noindex: true
---
<div class="container-qrcode"></div>

<script>
  var ua = navigator.userAgent;
  var url;
  if (ua.search(/MicroMessenger/) >= 0) {
    var type = 'wepay';
    var name = '微信支付';
    url = 'wxp://f2f0iwTnrnM6iy_HaLoqGqs0LUopmsUoW6In';
    var iconImg = '<img src="http://ww2.sinaimg.cn/large/005zWjpngy1fojrwgr20oj303k03kglg.jpg" width="48px" height="48px" alt="微信支付">';
  } else if (ua.search(/AlipayClient/) >= 0) {
    //支付宝链接
    url = 'HTTPS://QR.ALIPAY.COM/FKX05230ZI3SARQHNUUF45';
    window.location.href = url;
  } else if (ua.search(/QQ/) >= 0) {
    var type = 'qq';
    var name = 'QQ钱包支付';
    //QQ钱包支付链接
    url = 'https://i.qianbao.qq.com/wallet/sqrcode.htm?m=tenpay&a=1&u=3279174526&ac=73209950D80DB42A59772086E990E0E99771E4B3812746CA457989607989F91E&n=%E5%92%8C%E6%B4%8B%20Keit&f=wallet';
    var iconImg = '<img src="http://ww2.sinaimg.cn/large/005zWjpngy1fojrvmp427j303k03kjrb.jpg" width="48px" height="48px" alt="QQ钱包支付">';
  } else {
    var type = 'other';
    var name = '打赏作者';
    url = window.location.origin + '/donate';
    var iconImg = '<img src="http://ww2.sinaimg.cn/large/005zWjpngy1fojs089x6tj303k03kjr6.jpg" width="48px" height="48px" alt="打赏作者">';
  }
  var qrImg = '<img src="http://qr.liantu.com/api.php?text=' + encodeURIComponent(url) + '">'
  document.querySelector('.container-qrcode').innerHTML = qrImg;
</script>
